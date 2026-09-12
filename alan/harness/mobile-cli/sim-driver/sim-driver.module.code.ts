import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  createSession,
  dismissAlert,
  executeScript,
  getContexts,
  pickWebviewContext,
  setContext,
} from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import type { MintedSession } from "akasha/alan/harness/mobile-cli/sim-auth/sim-auth.module.code.ts"
import {
  mintRealUserSession,
  mintThrowawaySession,
  readRealUserSimAuthEnv,
  readSimAuthEnv,
  SUPABASE_STORAGE_KEY,
} from "akasha/alan/harness/mobile-cli/sim-auth/sim-auth.module.code.ts"
import {
  buildSimCapabilities,
  loadSessionState,
  requireSessionState,
  resolveWdaLocalPort,
  type SimSessionState,
  saveSessionState,
  WDA_LOCAL_PORT_ENV,
} from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export const APP_ORIGIN = "capacitor://localhost"

const WEBVIEW_POLL_ATTEMPTS = 30
const WEBVIEW_POLL_DELAY_MS = 1_000

export function buildAppUrl(route: string, kbDebug: boolean): string {
  const path = route.startsWith("/") ? route : `/${route}`
  if (!kbDebug) return `${APP_ORIGIN}${path}`
  if (/[?&]kbDebug=/.test(path)) return `${APP_ORIGIN}${path}`
  const sep = path.includes("?") ? "&" : "?"
  return `${APP_ORIGIN}${path}${sep}kbDebug=1`
}

async function acquireWebview(base: string, sessionId: string): Promise<string> {
  for (let attempt = 0; attempt < WEBVIEW_POLL_ATTEMPTS; attempt++) {
    const contexts = await getContexts(base, sessionId)
    const webview = pickWebviewContext(contexts)
    if (webview !== undefined) {
      await setContext(base, sessionId, webview)
      return webview
    }
    await Bun.sleep(WEBVIEW_POLL_DELAY_MS)
  }
  throw new OperationalError(
    "the WKWebView never attached (only NATIVE_APP present after polling). " +
      "The native shell is not installed on this sim, or it never launched."
  )
}

export function attachedSaid(session: string, webview: string): string {
  return (
    `the sim session ${session} was switched onto the webview context ${webview}, ` +
    "and the session file on this disk says so now"
  )
}

async function attachWebview(done: string[], state: SimSessionState): Promise<SimSessionState> {
  let contexts: readonly string[]
  try {
    contexts = await getContexts(state.appiumBase, state.sessionId)
  } catch (err) {
    throw new OperationalError(
      `the recorded sim session (${state.sessionId}) is unreachable — Appium may be down or the ` +
        "session ended. It cannot be driven again; a fresh session must be opened on a route. " +
        `(${err instanceof Error ? err.message : String(err)})`
    )
  }
  const webview = pickWebviewContext(contexts)
  if (webview === undefined) {
    throw new OperationalError(
      "no WKWebView context is attached to the sim session (only NATIVE_APP). " +
        "The app must be reloaded on a route before a webview attaches."
    )
  }
  await setContext(state.appiumBase, state.sessionId, webview)
  const updated: SimSessionState = { ...state, webviewContext: webview }
  saveSessionState(updated)
  done.push(attachedSaid(state.sessionId, webview))
  return updated
}

export type Opening = {
  readonly loaded: () => SimSessionState | null
  readonly live: (state: SimSessionState) => Promise<boolean>
  readonly created: (base: string, capabilities: unknown) => Promise<string>
  readonly dismissed: (base: string, sessionId: string) => Promise<unknown>
  readonly acquired: (base: string, sessionId: string) => Promise<string>
  readonly minted: (asRealUser: boolean) => Promise<MintedSession>
  readonly scripted: (
    base: string,
    sessionId: string,
    script: string,
    args: readonly unknown[]
  ) => Promise<unknown>
  readonly saved: (state: SimSessionState) => undefined
}

const OPENING: Opening = {
  loaded: loadSessionState,
  live: sessionStillLive,
  created: createSession,
  dismissed: dismissAlert,
  acquired: acquireWebview,
  minted: (asRealUser) =>
    asRealUser
      ? mintRealUserSession(readRealUserSimAuthEnv())
      : mintThrowawaySession(readSimAuthEnv()),
  scripted: executeScript,
  saved: saveSessionState,
}

export function sessionSaid(sessionId: string): string {
  return `opened the Appium session ${sessionId}, which nothing has written down yet`
}

export function signedInSaid(asRealUser: boolean): string {
  const who = asRealUser ? "Alan, for reading only" : "the throwaway"
  return `signed in as ${who}, so that sign-in is live`
}

export const STORED = "put that sign-in into the app's storage"

export async function openSession(
  opts: {
    readonly base: string
    readonly udid: string
    readonly bundleId: string
    readonly route: string
    readonly kbDebug: boolean
    readonly asRealUser: boolean
  },
  done: string[] = [],
  opening: Opening = OPENING
): Promise<SimSessionState> {
  const url = buildAppUrl(opts.route, opts.kbDebug)

  const existing = opening.loaded()
  let sessionId: string
  let reused = false
  if (
    existing !== null &&
    existing.appiumBase === opts.base &&
    existing.udid === opts.udid &&
    (await opening.live(existing))
  ) {
    sessionId = existing.sessionId
    reused = true
  } else {
    sessionId = await opening.created(
      opts.base,
      buildSimCapabilities(
        opts.udid,
        resolveWdaLocalPort(optionalEnv(WDA_LOCAL_PORT_ENV)),
        opts.bundleId
      )
    )
    done.push(sessionSaid(sessionId))
    await opening.dismissed(opts.base, sessionId)
  }

  await opening.acquired(opts.base, sessionId)

  const minted = await opening.minted(opts.asRealUser)
  done.push(signedInSaid(opts.asRealUser))
  await opening.scripted(
    opts.base,
    sessionId,
    "window.localStorage.setItem(arguments[0], arguments[1]); return true;",
    [SUPABASE_STORAGE_KEY, JSON.stringify(minted.session)]
  )
  done.push(STORED)
  try {
    await opening.scripted(opts.base, sessionId, "window.location.assign(arguments[0]);", [url])
  } catch {}
  await Bun.sleep(WEBVIEW_POLL_DELAY_MS)
  const webview = await opening.acquired(opts.base, sessionId)

  const state: SimSessionState = {
    sessionId,
    udid: opts.udid,
    appiumBase: opts.base,
    webviewContext: webview,
    route: url,
    startedAtMs: existing !== null && reused ? existing.startedAtMs : Date.now(),
  }
  opening.saved(state)
  return state
}

async function sessionStillLive(state: SimSessionState): Promise<boolean> {
  try {
    await getContexts(state.appiumBase, state.sessionId)
    return true
  } catch {
    return false
  }
}

function requireDrivingState(): SimSessionState {
  return requireSessionState()
}

export async function driving(done: string[]): Promise<SimSessionState> {
  return await attachWebview(done, requireDrivingState())
}
