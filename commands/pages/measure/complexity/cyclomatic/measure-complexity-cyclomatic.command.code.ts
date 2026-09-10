import { resolve } from "node:path"
import type { Answer, Given } from "../../../../modules/calling/calling.module.code.ts"
import {
  answeredBy,
  cyclomaticLines,
  readIn,
} from "../../../../modules/complexity-rowing/complexity-rowing.module.code.ts"

export function measureComplexityCyclomatic(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv, { file: true, threshold: true })
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  return answeredBy(() => cyclomaticLines(read, resolve(given.root)))
}
