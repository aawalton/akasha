import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { countsIn, linesOf } from "../measure/page-measuring/page-measuring.module.code.ts"

export function measurePages(_argv: readonly string[], given: Given): Answer {
  return { report: [...linesOf(countsIn(given.root))], refusals: [], code: 0 }
}
