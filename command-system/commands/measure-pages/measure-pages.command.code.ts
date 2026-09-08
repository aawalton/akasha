import {
  countsIn,
  linesOf,
} from "../../../commands/modules/page-measuring/page-measuring.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { told } from "../../command-answering/command-answering.module.code.ts"

export function measurePages(_argv: readonly string[], given: Given): Answer {
  return told(linesOf(countsIn(given.root)))
}
