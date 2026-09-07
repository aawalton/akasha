import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import {
  costsIn,
  linesOf,
} from "../../../command-system/commands/measure/check-measuring/check-measuring.module.code.ts"

export function measureChecks(_argv: readonly string[], given: Given): Answer {
  return { report: [...linesOf(costsIn(given.root, Date.now()))], refusals: [], code: 0 }
}
