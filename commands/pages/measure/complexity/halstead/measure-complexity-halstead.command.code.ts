import { resolve } from "node:path"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  halsteadLines,
  readIn,
} from "akasha/commands/modules/complexity-rowing/complexity-rowing.module.code.ts"
import { answeredBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"

export function measureComplexityHalstead(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv, { file: true, threshold: true })
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  return answeredBy(() => halsteadLines(read, resolve(given.root)))
}
