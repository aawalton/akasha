import { deleteSession } from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import { stopAppium } from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  clearSessionState,
  loadSessionState,
} from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  answering,
  flagsAloneIn,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Reading,
  wordsIn,
} from "akasha/commands/pages/mobile/mobile-answering/mobile-answering.module.code.ts"

const STOP_APPIUM = "--stop-appium"

const SWITCHES = [STOP_APPIUM]

export type Read = {
  readonly stopAppium: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, [], SWITCHES)
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  return { stopAppium: said.flags.has(STOP_APPIUM) }
}

export type Tearing = {
  readonly loaded: () => SimSessionState | null
  readonly ended: (base: string, sessionId: string) => Promise<unknown>
  readonly cleared: () => unknown
  readonly stopped: () => Promise<unknown>
}

export const TEARING: Tearing = {
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

export async function mobileSimTeardown(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => await tornDown(read, done))
}
