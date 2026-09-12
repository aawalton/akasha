import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { clipFrames } from "akasha/commands/arguments/pages/clip-frames.argument.ts"
import { endImage } from "akasha/commands/arguments/pages/end-image.argument.ts"
import { lightning } from "akasha/commands/arguments/pages/lightning.argument.ts"
import { negativePrompt } from "akasha/commands/arguments/pages/negative-prompt.argument.ts"
import { negativePromptFile } from "akasha/commands/arguments/pages/negative-prompt-file.argument.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import { promptFile } from "akasha/commands/arguments/pages/prompt-file.argument.ts"
import { renderPrompt } from "akasha/commands/arguments/pages/render-prompt.argument.ts"
import { seed } from "akasha/commands/arguments/pages/seed.argument.ts"
import { size } from "akasha/commands/arguments/pages/size.argument.ts"
import { startImage } from "akasha/commands/arguments/pages/start-image.argument.ts"
import { steps } from "akasha/commands/arguments/pages/steps.argument.ts"
import { timeout } from "akasha/commands/arguments/pages/timeout.argument.ts"
import type { Read } from "akasha/commands/arguments/word-reading/argument-word-reading.module.code.ts"
import {
  OPERATIONAL,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { inferenceWanGenerate as page } from "akasha/commands/pages/inference/wan/generate/inference-wan-generate.command.ts"
import { generating } from "akasha/commands/pages/inference/wan/wan-clip-rendering/wan-clip-rendering.module.code.ts"

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

export async function inferenceWanGenerate(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readGenerate(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  const report: string[] = []
  try {
    return await generating(read.taken, given, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
