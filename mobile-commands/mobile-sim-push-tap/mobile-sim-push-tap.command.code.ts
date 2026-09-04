import type { Answer } from "@akasha/command-system/calling"
import {
  createSession,
  deleteSession,
  executeScript,
  getContexts,
  setContext,
  tapCoordinates,
} from "@akasha/mobile-cli/appium-client"
import { MACBOOK } from "@akasha/mobile-cli/macbook-target"
import type { MobileApp } from "@akasha/mobile-cli/mobile-app"
import { runSshCapture } from "@akasha/mobile-cli/mobile-ssh"
import { buildApnsPayload, buildPushTapScript } from "@akasha/mobile-cli/push-tap-script"
import { ensureAppium, resolveAndBootSim } from "@akasha/mobile-cli/sim-macbook"
import {
  buildBannerTapCapabilities,
  loadSessionState,
  resolveWdaLocalPort,
  WDA_LOCAL_PORT_ENV,
} from "@akasha/mobile-cli/sim-session"
import { optionalEnv } from "@akasha/utils-narrow/require-env"
import { z } from "zod"
import {
  APP_SAID,
  answering,
  appIn,
  OPERATIONAL,
  type Reading,
  refusedBy,
  standingFor,
  told,
  UDID_SAID,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

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
  const said = standingFor(words, ROUTE)
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

type Traced =
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

async function probed(read: Read): Promise<Answer> {
  const base = await ensureAppium()
  const udid = read.udid ?? loadSessionState()?.udid ?? (await resolveAndBootSim())
  const report = [
    `${read.cold ? "cold" : "warm"} push of ${read.route} to ${read.app.bundleId} on ${udid}`,
  ]

  const pushed = await runSshCapture(
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
  )
  report.push(pushed.trimEnd())

  const sessionId = await createSession(
    base,
    buildBannerTapCapabilities(
      udid,
      resolveWdaLocalPort(optionalEnv(WDA_LOCAL_PORT_ENV)),
      read.app.bundleId
    )
  )
  try {
    await tapCoordinates(base, sessionId, BANNER_X, BANNER_Y)
    const traced = await traceOf(base, sessionId)
    if ("missing" in traced) {
      return {
        report,
        refusals: [
          "the installed bundle exposes no tap trace, so it was built without the instrument — install one from a tree that carries it",
        ],
        code: OPERATIONAL,
      }
    }
    if ("quiet" in traced) {
      return {
        report,
        refusals: [
          `no trace appeared in ${Math.round((TRIES * WAIT_MS) / A_SECOND)}s of the tap, so either no banner was there to tap or the tap did not reach the push handler`,
        ],
        code: OPERATIONAL,
      }
    }
    report.push(JSON.stringify(traced.entries, null, INDENT))
    return told(report)
  } finally {
    await deleteSession(base, sessionId).catch(() => undefined)
  }
}

export async function mobileSimPushTap(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await probed(read))
}
