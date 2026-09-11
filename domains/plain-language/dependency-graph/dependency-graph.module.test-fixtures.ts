import type { DepSentence } from "akasha/domains/plain-language/dependency-graph/dependency-graph.module.code.ts"
import { makeSentence } from "akasha/domains/plain-language/dependency-graph/dependency-graph.module.code.ts"

export type Row = readonly [string, string, number, string]

export function sentenceOf(rows: readonly Row[]): DepSentence {
  let at = 0
  const tokens = rows.map(([form, upos, head, deprel], index) => {
    const start = at
    at += form.length + 1
    return { id: index + 1, form, upos, head, deprel, start, end: start + form.length }
  })
  return makeSentence({ text: rows.map((row) => row[0]).join(" "), start: 0, end: at, tokens })
}
