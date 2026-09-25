import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounGroupAlone = {
  id: "01a0c57f-2d90-7475-a1a4-587ac08f0ec0",
  type: "page-type/construction",
  slug: "noun-group-alone",
  definition: "a noun phrase written from a noun group and nothing else",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: ["phrase-kind/noun-group"],
  admits: ["markdown", "arousal", "code"],
  refuses: ["the code"],
} as const satisfies Construction
