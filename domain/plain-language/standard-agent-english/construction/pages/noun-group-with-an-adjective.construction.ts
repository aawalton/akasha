import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounGroupWithAnAdjective = {
  id: "01a0c5f9-391e-719d-9f02-bb4b63c6b37a",
  type: "page-type/construction",
  slug: "noun-group-with-an-adjective",
  definition: "a noun group written from an adjective and the noun group that adjective describes",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: ["part-of-speech/adjective", "phrase-kind/noun-group"],
  admits: ["mechanical change", "fresh identifier", "whole plants"],
  refuses: ["change mechanical", "mechanical a change"],
} as const satisfies Construction
