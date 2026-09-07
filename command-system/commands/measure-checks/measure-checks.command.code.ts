import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { costsIn, linesOf } from "../measure/check-measuring/check-measuring.module.code.ts"

export function measureChecks(_argv: readonly string[], given: Given): Answer {
  return { report: [...linesOf(costsIn(given.root, Date.now()))], refusals: [], code: 0 }
}
