import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import type { Read } from "akasha/commands/arguments/modules/word-reading/argument-word-reading.module.code.ts"
import { context } from "akasha/commands/arguments/pages/context.argument.ts"
import { contextFrames } from "akasha/commands/arguments/pages/context-frames.argument.ts"
import { direction } from "akasha/commands/arguments/pages/direction.argument.ts"
import { lightning } from "akasha/commands/arguments/pages/lightning.argument.ts"
import { negativePrompt } from "akasha/commands/arguments/pages/negative-prompt.argument.ts"
import { negativePromptFile } from "akasha/commands/arguments/pages/negative-prompt-file.argument.ts"
import { newFrames } from "akasha/commands/arguments/pages/new-frames.argument.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import { promptFile } from "akasha/commands/arguments/pages/prompt-file.argument.ts"
import { renderPrompt } from "akasha/commands/arguments/pages/render-prompt.argument.ts"
import { seed } from "akasha/commands/arguments/pages/seed.argument.ts"
import { size } from "akasha/commands/arguments/pages/size.argument.ts"
import { steps } from "akasha/commands/arguments/pages/steps.argument.ts"
import { timeout } from "akasha/commands/arguments/pages/timeout.argument.ts"
import {
  answering,
  naming,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceWanExtend as page } from "akasha/commands/pages/inference/wan/extend/inference-wan-extend.command.ts"
import { extending } from "akasha/commands/pages/inference/wan/wan-clip-rendering/wan-clip-rendering.module.code.ts"

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

export type Making = (taken: Taken, given: Given, done: string[]) => Promise<Answer>

export async function inferenceWanExtend(
  argv: readonly string[],
  given: Given,
  making: Making = extending
): Promise<Answer> {
  const read = readExtend(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => naming(done, await making(read.taken, given, done)))
}
