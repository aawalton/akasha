import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const prepositionWithANounPhrase = {
  id: "01a0c591-87d4-736c-87a6-3f506e56b6be",
  type: "page-type/construction",
  slug: "preposition-with-a-noun-phrase",
  definition: "a preposition phrase written from a preposition and the noun phrase it names",
  phraseKind: "phrase-kind/preposition-phrase",
  writtenFrom: ["part-of-speech/preposition", "phrase-kind/noun-phrase"],
  admits: ["in a cluster", "over Supabase", "of a file"],
  refuses: ["a cluster in", "in"],
} as const satisfies Construction
