import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  countsIn,
  linesOf,
} from "akasha/commands/pages/measure/repo/repo-measuring/repo-measuring.module.code.ts"

export function measureRepo(_argv: readonly string[], given: Given): Answer {
  return told(linesOf(countsIn(given.root)))
}
