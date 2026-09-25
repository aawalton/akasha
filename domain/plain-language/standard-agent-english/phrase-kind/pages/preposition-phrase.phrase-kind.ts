import type { PhraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.types.ts"

export const prepositionPhrase = {
  id: "01a0c591-7122-76ec-abd4-2e48a1601678",
  type: "page-type/phrase-kind",
  slug: "preposition-phrase",
  definition: "a preposition with the noun phrase that preposition names",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase is named for the word that phrase is written from, here and elsewhere.",
    },
  ],
} as const satisfies PhraseKind
