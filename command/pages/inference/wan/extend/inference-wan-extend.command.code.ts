import {
  type TakenFor,
  takenFor,
} from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import type { Read } from "akasha/command/argument/modules/word-reading/argument-word-reading.module.code.ts"
import { context } from "akasha/command/argument/pages/context.argument.ts"
import { contextFrames } from "akasha/command/argument/pages/context-frames.argument.ts"
import { direction } from "akasha/command/argument/pages/direction.argument.ts"
import { lightning } from "akasha/command/argument/pages/lightning.argument.ts"
import { negativePrompt } from "akasha/command/argument/pages/negative-prompt.argument.ts"
import { negativePromptFile } from "akasha/command/argument/pages/negative-prompt-file.argument.ts"
import { newFrames } from "akasha/command/argument/pages/new-frames.argument.ts"
import { output } from "akasha/command/argument/pages/output.argument.ts"
import { promptFile } from "akasha/command/argument/pages/prompt-file.argument.ts"
import { renderPrompt } from "akasha/command/argument/pages/render-prompt.argument.ts"
import { seed } from "akasha/command/argument/pages/seed.argument.ts"
import { size } from "akasha/command/argument/pages/size.argument.ts"
import { steps } from "akasha/command/argument/pages/steps.argument.ts"
import { timeout } from "akasha/command/argument/pages/timeout.argument.ts"
import {
  answering,
  naming,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { inferenceWanExtend as page } from "akasha/command/pages/inference/wan/extend/inference-wan-extend.command.ts"
import { extending } from "akasha/command/pages/inference/wan/modules/wan-clip-rendering/wan-clip-rendering.module.code.ts"

const PAGES = [
  context,
  contextFrames,
  direction,
  lightning,
  negativePrompt,
  negativePromptFile,
  newFrames,
  output,
  promptFile,
  renderPrompt,
  seed,
  size,
  steps,
  timeout,
]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export function readExtend(argv: readonly string[], calledAs: string): Read<Taken> {
  return takenFor(argv, calledAs, page, PAGES)
}

type Making = (taken: Taken, given: Given, done: string[]) => Promise<Answer>

export async function inferenceWanExtend(
  argv: readonly string[],
  given: Given,
  making: Making = extending
): Promise<Answer> {
  const read = readExtend(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => naming(done, await making(read.taken, given, done)))
}
