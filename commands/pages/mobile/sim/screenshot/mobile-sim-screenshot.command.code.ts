import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { screenshot } from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import {
  answering,
  flagsAloneIn,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  driving,
  type Reading,
  wordsIn,
} from "akasha/commands/pages/mobile/mobile-answering/mobile-answering.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const OUTPUT = "--output"

const VALUED = [OUTPUT]

export type Read = {
  readonly output: string
}

export function readIn(argv: readonly string[], nowMs: number): Reading<Read> {
  const said = wordsIn(argv, VALUED, [])
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  return { output: said.named[OUTPUT] ?? join(SCRATCH_AT, `mobile-sim-${nowMs}.png`) }
}

async function pictured(read: Read): Promise<Answer> {
  const state = await driving()
  const png = await screenshot(state.appiumBase, state.sessionId)
  writeFileSync(read.output, png)
  return told([read.output])
}

export async function mobileSimScreenshot(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv, Date.now())
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await pictured(read))
}
