import { resolve } from "node:path"
import type { Answer, Given } from "../../../../modules/calling/calling.module.code.ts"
import {
  answeredBy,
  readIn,
  reportLines,
} from "../../../../modules/complexity-rowing/complexity-rowing.module.code.ts"

export function measureComplexityReport(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv, { file: false, threshold: false })
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  return answeredBy(() => reportLines(read, resolve(given.root)))
}
