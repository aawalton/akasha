import type { Answer } from "@akasha/command-system/calling"
import { ensureAppium, resolveAndBootSim } from "@akasha/mobile-cli/sim-macbook"
import {
  answering,
  flagsAloneIn,
  keyedLines,
  type Reading,
  refusedBy,
  told,
  UDID_SAID,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

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

async function booted(read: Read): Promise<Answer> {
  const base = await ensureAppium()
  const udid = await resolveAndBootSim(read.udid)
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
  return await answering(async () => await booted(read))
}
