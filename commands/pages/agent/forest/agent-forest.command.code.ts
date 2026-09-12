import { resolve } from "node:path"
import { faulted, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { readIn } from "akasha/commands/pages/agent/forest/no-word-reading/no-word-reading.module.code.ts"
import {
  type ForestSaid,
  forestOver,
  NOW,
} from "akasha/seat-system/seat-forest-reading/seat-forest-reading.module.code.ts"

export function saidOf(forest: ForestSaid): string {
  return JSON.stringify(forest)
}

export async function agentForest(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return mistaking(read.refused)
  try {
    return told([saidOf(forestOver(resolve(given.root), NOW))])
  } catch (thrown) {
    return faulted(thrown)
  }
}
