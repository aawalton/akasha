import { told } from "../../../modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { countsIn, linesOf } from "../../../modules/page-measuring/page-measuring.module.code.ts"

export function measurePages(_argv: readonly string[], given: Given): Answer {
  return told(linesOf(countsIn(given.root)))
}
