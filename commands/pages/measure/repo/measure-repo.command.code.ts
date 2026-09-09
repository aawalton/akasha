import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"
import { told } from "../../../modules/command-answering/command-answering.module.code.ts"
import { countsIn, linesOf } from "../../../modules/repo-measuring/repo-measuring.module.code.ts"

export function measureRepo(_argv: readonly string[], given: Given): Answer {
  return told(linesOf(countsIn(given.root)))
}
