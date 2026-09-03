import { writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { screenshot } from "@akasha/mobile-cli/appium-client"
import {
  answering,
  driving,
  flagsAloneIn,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const OUT = "--out"

const VALUED = [OUT]

export type Read = {
  readonly out: string
}

export function readIn(argv: readonly string[], nowMs: number): Reading<Read> {
  const said = wordsIn(argv, VALUED, [])
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  return { out: said.named[OUT] ?? join(tmpdir(), `mobile-sim-${nowMs}.png`) }
}

async function pictured(read: Read): Promise<Answer> {
  const state = await driving()
  const png = await screenshot(state.appiumBase, state.sessionId)
  writeFileSync(read.out, png)
  return told([read.out])
}

export async function mobileSimScreenshot(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv, Date.now())
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await pictured(read))
}
