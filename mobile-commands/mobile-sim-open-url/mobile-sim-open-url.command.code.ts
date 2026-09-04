import type { Answer } from "@akasha/command-system/calling"
import type { MobileApp } from "@akasha/mobile-cli/mobile-app"
import { openSession } from "@akasha/mobile-cli/sim-driver"
import { ensureAppium, resolveAndBootSim } from "@akasha/mobile-cli/sim-macbook"
import { loadSessionState } from "@akasha/mobile-cli/sim-session"
import {
  APP_SAID,
  answering,
  appIn,
  keyedLines,
  type Reading,
  refusedBy,
  standingFor,
  told,
  UDID_SAID,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const ROUTE = "--route"

const KB_DEBUG = "--kb-debug"

const AS_REAL_USER = "--as-real-user"

const VALUED = [APP_SAID, ROUTE, UDID_SAID]

const SWITCHES = [KB_DEBUG, AS_REAL_USER]

export type Read = {
  readonly app: MobileApp
  readonly route: string
  readonly kbDebug: boolean
  readonly asRealUser: boolean
  readonly udid: string | undefined
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const words = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in words) return words
  const said = standingFor(words, ROUTE)
  if ("refused" in said) return said
  const route = said.named[ROUTE]
  if (route === undefined) {
    return { refused: [`\`${ROUTE}\` names the route to open, and nothing did`] }
  }
  const app = appIn(said)
  if ("refused" in app) return app
  return {
    app,
    route,
    kbDebug: said.flags.has(KB_DEBUG),
    asRealUser: said.flags.has(AS_REAL_USER),
    udid: said.named[UDID_SAID],
  }
}

async function opened(read: Read): Promise<Answer> {
  const base = await ensureAppium()
  const udid = read.udid ?? loadSessionState()?.udid ?? (await resolveAndBootSim())
  const state = await openSession({
    base,
    udid,
    bundleId: read.app.bundleId,
    route: read.route,
    kbDebug: read.kbDebug,
    asRealUser: read.asRealUser,
  })
  return told(
    keyedLines([
      ["session", state.sessionId],
      ["udid", state.udid],
      ["context", state.webviewContext],
      ["route", state.route],
      ["as", read.asRealUser ? "Alan, for reading only" : "the throwaway"],
    ])
  )
}

export async function mobileSimOpenUrl(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await opened(read))
}
