import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounWithAPrepositionPhrase = {
  id: "01a0c593-5e0a-7a00-be0b-096d9a7ee6bb",
  type: "page-type/construction",
  slug: "noun-with-a-preposition-phrase",
  definition: "a noun group written from a noun and the one preposition phrase after that noun",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: ["part-of-speech/noun", "phrase-kind/preposition-phrase"],
  admits: ["machine in a cluster", "suite for The Elder Scrolls Online"],
  refuses: ["machine in a cluster of servers", "in a cluster machine"],
} as const satisfies Construction
