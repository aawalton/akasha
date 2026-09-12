import { resolve } from "node:path"
import { refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { reportedBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"
import {
  declarationLines,
  SUBJECTS,
} from "akasha/commands/pages/domain/domain-drawing/domain-drawing.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const SUBJECT = "--subject"

export type Read =
  | { readonly subjects: readonly string[] }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const subjects: string[] = []
  const named = namesDrawn(SUBJECTS)
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one !== SUBJECT) {
      refusals.push(`\`${one}\` is no flag this takes — it takes \`${SUBJECT}\``)
      continue
    }
    const value = argv[at + 1]
    at += 1
    if (value === undefined || value.startsWith("-")) {
      refusals.push(`\`${SUBJECT}\` names one word and nothing followed it`)
      continue
    }
    if (!SUBJECTS.includes(value)) {
      refusals.push(`\`${value}\` is no subject — \`${SUBJECT}\` names ${named}`)
      continue
    }
    subjects.push(value)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { subjects }
}

export function domainDeclarationList(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return reportedBy(() => declarationLines(read.subjects, resolve(given.root)))
}
