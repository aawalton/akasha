import { OperationalError } from "@akasha/errors-core/exit-code"
import { optionalEnv } from "@akasha/utils-narrow/require-env"
import {
  createSession,
  dismissAlert,
  executeScript,
  getContexts,
  pickWebviewContext,
  setContext,
} from "../appium-client/appium-client.module.code.ts"
import {
  mintRealUserSession,
  mintThrowawaySession,
  readRealUserSimAuthEnv,
  readSimAuthEnv,
  SUPABASE_STORAGE_KEY,
} from "../sim-auth/sim-auth.module.code.ts"
import {
  buildSimCapabilities,
  loadSessionState,
  requireSessionState,
  resolveWdaLocalPort,
  type SimSessionState,
  saveSessionState,
  WDA_LOCAL_PORT_ENV,
} from "../sim-session/sim-session.module.code.ts"

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

export async function attachWebview(state: SimSessionState): Promise<SimSessionState> {
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
  return updated
}

export async function openSession(opts: {
  readonly base: string
  readonly udid: string
  readonly bundleId: string
  readonly route: string
  readonly kbDebug: boolean
  readonly asRealUser: boolean
}): Promise<SimSessionState> {
  const url = buildAppUrl(opts.route, opts.kbDebug)

  const existing = loadSessionState()
  let sessionId: string
  let reused = false
  if (
    existing !== null &&
    existing.appiumBase === opts.base &&
    existing.udid === opts.udid &&
    (await sessionStillLive(existing))
  ) {
    sessionId = existing.sessionId
    reused = true
  } else {
    sessionId = await createSession(
      opts.base,
      buildSimCapabilities(
        opts.udid,
        resolveWdaLocalPort(optionalEnv(WDA_LOCAL_PORT_ENV)),
        opts.bundleId
      )
    )
    await dismissAlert(opts.base, sessionId)
  }

  await acquireWebview(opts.base, sessionId)

  const minted = opts.asRealUser
    ? await mintRealUserSession(readRealUserSimAuthEnv())
    : await mintThrowawaySession(readSimAuthEnv())
  await executeScript(
    opts.base,
    sessionId,
    "window.localStorage.setItem(arguments[0], arguments[1]); return true;",
    [SUPABASE_STORAGE_KEY, JSON.stringify(minted.session)]
  )
  try {
    await executeScript(opts.base, sessionId, "window.location.assign(arguments[0]);", [url])
  } catch {}
  await Bun.sleep(WEBVIEW_POLL_DELAY_MS)
  const webview = await acquireWebview(opts.base, sessionId)

  const state: SimSessionState = {
    sessionId,
    udid: opts.udid,
    appiumBase: opts.base,
    webviewContext: webview,
    route: url,
    startedAtMs: existing !== null && reused ? existing.startedAtMs : Date.now(),
  }
  saveSessionState(state)
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

export function requireDrivingState(): SimSessionState {
  return requireSessionState()
}
