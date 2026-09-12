import {
  createSession,
  deleteSession,
  executeScript,
  getContexts,
  setContext,
  tapCoordinates,
} from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import { MACBOOK } from "akasha/alan/harness/mobile-cli/macbook-target/macbook-target.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { runSshCapture } from "akasha/alan/harness/mobile-cli/mobile-ssh/mobile-ssh.module.code.ts"
import {
  buildApnsPayload,
  buildPushTapScript,
} from "akasha/alan/harness/mobile-cli/push-tap-script/push-tap-script.module.code.ts"
import {
  ensureAppium,
  resolveAndBootSim,
} from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  buildBannerTapCapabilities,
  loadSessionState,
  resolveWdaLocalPort,
  WDA_LOCAL_PORT_ENV,
} from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  answering,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  APP_SAID,
  appIn,
  bareWordAs,
  type Reading,
  UDID_SAID,
  wordsIn,
} from "akasha/commands/pages/mobile/mobile-answering/mobile-answering.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { z } from "zod"

const ROUTE = "--route"

const WARM = "--warm"

const TITLE = "--title"

const VALUED = [APP_SAID, ROUTE, UDID_SAID, TITLE]

const SWITCHES = [WARM]

const BANNER_X = 201

const BANNER_Y = 90

const WEBVIEW = "WEBVIEW_"

const TRIES = 20

const WAIT_MS = 1_500

const A_SECOND = 1_000

const INDENT = 1

const READ_TRACE = "return JSON.stringify(window.getTapTrace ? window.getTapTrace().entries : null)"

const traceEntries = z
  .array(
    z
      .object({
        traceId: z.string(),
        launch: z.string(),
        outcome: z.string(),
      })
      .passthrough()
  )
  .nullable()

export type Read = {
  readonly app: MobileApp
  readonly route: string
  readonly cold: boolean
  readonly udid: string | undefined
  readonly title: string | undefined
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const words = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in words) return words
  const said = bareWordAs(words, ROUTE)
  if ("refused" in said) return said
  const route = said.named[ROUTE]
  if (route === undefined) {
    return { refused: [`\`${ROUTE}\` names the route the push carries, and nothing did`] }
  }
  const app = appIn(said)
  if ("refused" in app) return app
  return {
    app,
    route,
    cold: !said.flags.has(WARM),
    udid: said.named[UDID_SAID],
    title: said.named[TITLE],
  }
}

export type Traced =
  | { readonly entries: readonly unknown[] }
  | { readonly missing: true }
  | { readonly quiet: true }

async function traceOf(base: string, sessionId: string): Promise<Traced> {
  for (let attempt = 0; attempt < TRIES; attempt += 1) {
    await new Promise((keep) => setTimeout(keep, WAIT_MS))
    const webview = (await getContexts(base, sessionId)).find((one) => one.startsWith(WEBVIEW))
    if (webview === undefined) continue
    await setContext(base, sessionId, webview)
    const raw = await executeScript(base, sessionId, READ_TRACE, [])
    if (typeof raw !== "string") continue
    const decoded = traceEntries.safeParse(JSON.parse(raw))
    if (!decoded.success) continue
    if (decoded.data === null) return { missing: true }
    if (decoded.data.length > 0) return { entries: decoded.data }
  }
  return { quiet: true }
}

export type Probing = {
  readonly appium: () => Promise<string>
  readonly loaded: () => SimSessionState | null
  readonly sim: () => Promise<string>
  readonly pushed: (read: Read, udid: string) => Promise<string>
  readonly opened: (base: string, udid: string, bundleId: string) => Promise<string>
  readonly tapped: (base: string, sessionId: string, x: number, y: number) => Promise<unknown>
  readonly traced: (base: string, sessionId: string) => Promise<Traced>
  readonly ended: (base: string, sessionId: string) => Promise<unknown>
}

export const PROBING: Probing = {
  appium: ensureAppium,
  loaded: loadSessionState,
  sim: resolveAndBootSim,
  pushed: (read, udid) =>
    runSshCapture(
      MACBOOK,
      buildPushTapScript({
        udid,
        bundleId: read.app.bundleId,
        payload: buildApnsPayload({
          bundleId: read.app.bundleId,
          route: read.route,
          ...(read.title === undefined ? {} : { title: read.title }),
        }),
        cold: read.cold,
      })
    ),
  opened: (base, udid, bundleId) =>
    createSession(
      base,
      buildBannerTapCapabilities(
        udid,
        resolveWdaLocalPort(optionalEnv(WDA_LOCAL_PORT_ENV)),
        bundleId
      )
    ),
  tapped: tapCoordinates,
  traced: traceOf,
  ended: deleteSession,
}

export function pushSaid(read: Read, udid: string): string {
  return `${read.cold ? "cold" : "warm"} push of ${read.route} to ${read.app.bundleId} on ${udid}`
}

export async function probed(
  read: Read,
  done: string[],
  probing: Probing = PROBING
): Promise<Answer> {
  const base = await probing.appium()
  const udid = read.udid ?? probing.loaded()?.udid ?? (await probing.sim())

  const pushed = await probing.pushed(read, udid)
  done.push(pushSaid(read, udid), pushed.trimEnd())

  const sessionId = await probing.opened(base, udid, read.app.bundleId)
  try {
    await probing.tapped(base, sessionId, BANNER_X, BANNER_Y)
    const traced = await probing.traced(base, sessionId)
    if ("missing" in traced) {
      return {
        report: done,
        refusals: [
          "the installed bundle exposes no tap trace, so it was built without the instrument — install one from a tree that carries it",
        ],
        code: OPERATIONAL,
      }
    }
    if ("quiet" in traced) {
      return {
        report: done,
        refusals: [
          `no trace appeared in ${Math.round((TRIES * WAIT_MS) / A_SECOND)}s of the tap, so either no banner was there to tap or the tap did not reach the push handler`,
        ],
        code: OPERATIONAL,
      }
    }
    done.push(JSON.stringify(traced.entries, null, INDENT))
    return told(done)
  } finally {
    await probing.ended(base, sessionId).catch(() => undefined)
  }
}

export async function mobileSimPushTap(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => await probed(read, done))
}
