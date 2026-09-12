import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Shape } from "akasha/commands/pages/inference/wan/flag-arguing/flag-arguing.module.code.ts"
import type { Taking } from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"
import { readIn } from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"
import { extending } from "akasha/commands/pages/inference/wan/wan-clip-rendering/wan-clip-rendering.module.code.ts"

const TAKING: Taking = {
  shapes: new Map<string, Shape>([
    ["--context", "token"],
    ["--direction", "token"],
    ["--prompt", "prose"],
    ["--negative-prompt", "prose"],
    ["--context-frames", "token"],
    ["--new-frames", "token"],
    ["--seed", "token"],
    ["--steps", "token"],
    ["--lightning", "switch"],
    ["--size", "token"],
    ["--output", "token"],
    ["--timeout", "token"],
  ]),
  filled: new Map([
    ["--context-frames", "24"],
    ["--new-frames", "16"],
    ["--timeout", "3600"],
  ]),
  needed: ["--context", "--direction", "--prompt"],
}

export function readExtend(argv: readonly string[]): ReturnType<typeof readIn> {
  return readIn(argv, TAKING)
}

export async function inferenceWanExtend(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readExtend(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    return await extending(read, given, argv, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
