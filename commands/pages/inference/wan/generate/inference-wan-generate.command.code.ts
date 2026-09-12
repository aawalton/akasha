import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Shape } from "akasha/commands/pages/inference/wan/flag-arguing/flag-arguing.module.code.ts"
import type { Taking } from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"
import { readIn } from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"
import { generating } from "akasha/commands/pages/inference/wan/wan-clip-rendering/wan-clip-rendering.module.code.ts"

const TAKING: Taking = {
  shapes: new Map<string, Shape>([
    ["--start-image", "token"],
    ["--end-image", "token"],
    ["--prompt", "prose"],
    ["--negative-prompt", "prose"],
    ["--seed", "token"],
    ["--steps", "token"],
    ["--lightning", "switch"],
    ["--size", "token"],
    ["--frames", "token"],
    ["--output", "token"],
    ["--timeout", "token"],
  ]),
  filled: new Map([
    ["--size", "1280x720"],
    ["--frames", "81"],
    ["--timeout", "3600"],
  ]),
  needed: ["--prompt"],
}

export function readGenerate(argv: readonly string[]): ReturnType<typeof readIn> {
  return readIn(argv, TAKING)
}

export async function inferenceWanGenerate(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readGenerate(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    return await generating(read, given, argv, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
