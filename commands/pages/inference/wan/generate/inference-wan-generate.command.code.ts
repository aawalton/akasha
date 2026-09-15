import {
  type TakenFor,
  takenFor,
} from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import type { Read } from "akasha/command/arguments/modules/word-reading/argument-word-reading.module.code.ts"
import { clipFrames } from "akasha/command/arguments/pages/clip-frames.argument.ts"
import { endImage } from "akasha/command/arguments/pages/end-image.argument.ts"
import { lightning } from "akasha/command/arguments/pages/lightning.argument.ts"
import { negativePrompt } from "akasha/command/arguments/pages/negative-prompt.argument.ts"
import { negativePromptFile } from "akasha/command/arguments/pages/negative-prompt-file.argument.ts"
import { output } from "akasha/command/arguments/pages/output.argument.ts"
import { promptFile } from "akasha/command/arguments/pages/prompt-file.argument.ts"
import { renderPrompt } from "akasha/command/arguments/pages/render-prompt.argument.ts"
import { seed } from "akasha/command/arguments/pages/seed.argument.ts"
import { size } from "akasha/command/arguments/pages/size.argument.ts"
import { startImage } from "akasha/command/arguments/pages/start-image.argument.ts"
import { steps } from "akasha/command/arguments/pages/steps.argument.ts"
import { timeout } from "akasha/command/arguments/pages/timeout.argument.ts"
import {
  answering,
  naming,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { inferenceWanGenerate as page } from "akasha/command/pages/inference/wan/generate/inference-wan-generate.command.ts"
import { generating } from "akasha/command/pages/inference/wan/modules/wan-clip-rendering/wan-clip-rendering.module.code.ts"

const PAGES = [
  clipFrames,
  endImage,
  lightning,
  negativePrompt,
  negativePromptFile,
  output,
  promptFile,
  renderPrompt,
  seed,
  size,
  startImage,
  steps,
  timeout,
]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export function readGenerate(argv: readonly string[], calledAs: string): Read<Taken> {
  return takenFor(argv, calledAs, page, PAGES)
}

export type Making = (taken: Taken, given: Given, done: string[]) => Promise<Answer>

export async function inferenceWanGenerate(
  argv: readonly string[],
  given: Given,
  making: Making = generating
): Promise<Answer> {
  const read = readGenerate(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => naming(done, await making(read.taken, given, done)))
}
