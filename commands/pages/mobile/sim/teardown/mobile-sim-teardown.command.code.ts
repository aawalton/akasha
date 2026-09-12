import { deleteSession } from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import { stopAppium } from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  clearSessionState,
  loadSessionState,
} from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { stopAppium as stopAppiumArgument } from "akasha/commands/arguments/pages/stop-appium.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mobileSimTeardown as page } from "akasha/commands/pages/mobile/sim/teardown/mobile-sim-teardown.command.ts"

export type Read = {
  readonly stopAppium: boolean
}

export type Tearing = {
  readonly loaded: () => SimSessionState | null
  readonly ended: (base: string, sessionId: string) => Promise<unknown>
  readonly cleared: () => unknown
  readonly stopped: () => Promise<unknown>
}

const TEARING: Tearing = {
  loaded: loadSessionState,
  ended: deleteSession,
  cleared: clearSessionState,
  stopped: stopAppium,
}

export const CLEARED = "cleared what was written down about the session"

export const STOPPED = "stopped the mac's Appium server"

export async function tornDown(
  read: Read,
  done: string[],
  tearing: Tearing = TEARING
): Promise<Answer> {
  const state = tearing.loaded()
  if (state === null) {
    done.push("no session was there, so none was ended")
  } else {
    try {
      await tearing.ended(state.appiumBase, state.sessionId)
      done.push(`ended session ${state.sessionId}`)
    } catch {
      done.push(`session ${state.sessionId} was already gone from Appium`)
    }
  }
  tearing.cleared()
  done.push(CLEARED)
  if (read.stopAppium) {
    await tearing.stopped()
    done.push(STOPPED)
  }
  return told(done)
}

export async function mobileSimTeardown(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [stopAppiumArgument])
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  return await answering(async (done) => await tornDown({ stopAppium: taken.stopAppium }, done))
}
