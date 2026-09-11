import { resolve } from "node:path"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  readIn,
  reportLines,
} from "akasha/commands/modules/complexity-rowing/complexity-rowing.module.code.ts"
import { answeredBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"

export function measureComplexityReport(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv, { file: false, threshold: false })
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  return answeredBy(() => reportLines(read, resolve(given.root)))
}
