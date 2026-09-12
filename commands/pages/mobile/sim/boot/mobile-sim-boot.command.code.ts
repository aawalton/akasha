import {
  appiumIsUp,
  ensureAppium,
  resolveAndBootSim,
} from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import {
  answering,
  flagsAloneIn,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  keyedLines,
  type Reading,
  UDID_SAID,
  wordsIn,
} from "akasha/commands/pages/mobile/mobile-answering/mobile-answering.module.code.ts"

const VALUED = [UDID_SAID]

export type Read = {
  readonly udid: string | undefined
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, [])
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  return { udid: said.named[UDID_SAID] }
}

export type Booting = {
  readonly up: () => Promise<boolean>
  readonly appium: () => Promise<string>
  readonly sim: (udid: string | undefined) => Promise<string>
}

export const BOOTING: Booting = {
  up: appiumIsUp,
  appium: ensureAppium,
  sim: resolveAndBootSim,
}

export function startedSaid(base: string): string {
  return `started the mac's Appium server at ${base}`
}

export async function booted(
  read: Read,
  done: string[],
  booting: Booting = BOOTING
): Promise<Answer> {
  const wasUp = await booting.up()
  const base = await booting.appium()
  if (!wasUp) done.push(startedSaid(base))
  const udid = await booting.sim(read.udid)
  return told(
    keyedLines([
      ["udid", udid],
      ["appium", base],
    ])
  )
}

export async function mobileSimBoot(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => await booted(read, done))
}
