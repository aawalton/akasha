import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAPrepositionPhrase = {
  id: "01a0c593-5e0a-7a00-be0b-096d9a7ee6bb",
  type: "page-type/construction",
  slug: "noun-run-with-a-preposition-phrase",
  definition: "a noun group written from a noun run and the preposition phrase after it",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: ["phrase-kind/noun-run", "phrase-kind/preposition-phrase"],
  admits: ["machine in a cluster", "page property with a web address"],
  refuses: ["machine in a cluster of servers", "in a cluster machine"],
} as const satisfies Construction
