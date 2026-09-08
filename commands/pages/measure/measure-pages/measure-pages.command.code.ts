import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"
import { told } from "../../../../command-system/command-answering/command-answering.module.code.ts"
import { countsIn, linesOf } from "../../../modules/page-measuring/page-measuring.module.code.ts"

export function measurePages(_argv: readonly string[], given: Given): Answer {
  return told(linesOf(countsIn(given.root)))
}
