import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const properNounAlone = {
  id: "01a0d483-f77d-7276-9b1f-c25fde355365",
  type: "page-type/construction",
  slug: "proper-noun-alone",
  definition: "a noun phrase written from one proper noun and nothing else",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: ["part-of-speech/proper-noun"],
  admits: ["Alan", "Claude Code", "what Alan has"],
  refuses: ["the Alan"],
} as const satisfies Construction
