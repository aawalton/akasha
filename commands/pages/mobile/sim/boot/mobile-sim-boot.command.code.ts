import {
  ensureAppium,
  resolveAndBootSim,
} from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { udid as udidArgument } from "akasha/commands/arguments/pages/udid.argument.ts"
import {
  answering,
  keyedLines,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mobileSimBoot as page } from "akasha/commands/pages/mobile/sim/boot/mobile-sim-boot.command.ts"

export type Read = {
  readonly udid: string | undefined
}

export type Booting = {
  readonly appium: (done: string[]) => Promise<string>
  readonly sim: (done: string[], udid: string | undefined) => Promise<string>
}

const BOOTING: Booting = {
  appium: ensureAppium,
  sim: resolveAndBootSim,
}

export async function booted(
  read: Read,
  done: string[],
  booting: Booting = BOOTING
): Promise<Answer> {
  const base = await booting.appium(done)
  const udid = await booting.sim(done, read.udid)
  return told(
    keyedLines([
      ["udid", udid],
      ["appium", base],
    ])
  )
}

export async function mobileSimBoot(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [udidArgument])
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  return await answering(async (done) => await booted({ udid: taken.udid }, done))
}
