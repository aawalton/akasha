import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { appIn } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { openSession } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import {
  ensureAppium,
  resolveAndBootSim,
} from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import { loadSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { app } from "akasha/commands/arguments/pages/app.argument.ts"
import { asRealUser } from "akasha/commands/arguments/pages/as-real-user.argument.ts"
import { kbDebug } from "akasha/commands/arguments/pages/kb-debug.argument.ts"
import { route } from "akasha/commands/arguments/pages/route.argument.ts"
import { udid as udidArgument } from "akasha/commands/arguments/pages/udid.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { keyedLines } from "akasha/commands/pages/mobile/mobile-answering/mobile-answering.module.code.ts"
import { mobileSimOpenUrl as page } from "akasha/commands/pages/mobile/sim/open-url/mobile-sim-open-url.command.ts"

const TAKES = [app, udidArgument, route, kbDebug, asRealUser]

export type Read = {
  readonly app: MobileApp
  readonly route: string
  readonly kbDebug: boolean
  readonly asRealUser: boolean
  readonly udid: string | undefined
}

export type Routing = (done: string[], read: Read) => Promise<Answer>

async function opened(done: string[], read: Read): Promise<Answer> {
  const base = await ensureAppium(done)
  const udid = read.udid ?? loadSessionState()?.udid ?? (await resolveAndBootSim(done))
  const state = await openSession(
    {
      base,
      udid,
      bundleId: read.app.bundleId,
      route: read.route,
      kbDebug: read.kbDebug,
      asRealUser: read.asRealUser,
    },
    done
  )
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

export async function mobileSimOpenUrl(
  argv: readonly string[],
  given: Given,
  routing: Routing = opened
): Promise<Answer> {
  const said = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in said) return refusedBy(said.refused)
  const taken = said.taken
  const held = appIn(taken.app)
  if ("refused" in held) return refusedBy(held.refused)
  const read: Read = {
    app: held,
    route: taken.route,
    kbDebug: taken.kbDebug,
    asRealUser: taken.asRealUser,
    udid: taken.udid,
  }
  return await answering(async (done) => await routing(done, read))
}
