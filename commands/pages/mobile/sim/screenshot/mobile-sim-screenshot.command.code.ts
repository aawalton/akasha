import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { screenshot } from "akasha/alan/harness/mobile-cli/modules/appium-client/appium-client.module.code.ts"
import { driving } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

import { mobileSimScreenshot as page } from "akasha/commands/pages/mobile/sim/screenshot/mobile-sim-screenshot.command.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export type Read = {
  readonly output: string
}

export function pathIn(said: string | undefined, nowMs: number): string {
  return said ?? join(SCRATCH_AT, `mobile-sim-${nowMs}.png`)
}

export type Picturing = (done: string[], read: Read) => Promise<Answer>

async function pictured(done: string[], read: Read): Promise<Answer> {
  const state = await driving(done)
  const png = await screenshot(state.appiumBase, state.sessionId)
  writeFileSync(read.output, png)
  return told([read.output])
}

export async function mobileSimScreenshot(
  argv: readonly string[],
  given: Given,
  picturing: Picturing = pictured
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [output])
  if ("refused" in read) return refusedBy(read.refused)
  const held: Read = { output: pathIn(read.taken.output, Date.now()) }
  return await answering(async (done) => await picturing(done, held))
}
