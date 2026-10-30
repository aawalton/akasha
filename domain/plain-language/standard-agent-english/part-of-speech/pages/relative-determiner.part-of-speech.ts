import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const relativeDeterminer = {
  id: "01a18d7e-1614-7978-8225-8029f9c60d7e",
  type: "page-type/part-of-speech",
  slug: "relative-determiner",
  definition: "a word opening a clause about what the noun before it has",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word here sits before a noun group in the clause, as a determiner does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That noun group belongs to the noun written before the word.",
    },
  ],
  createdAt: "2026-10-30T15:46:53.072Z",
  updatedAt: "2026-10-30T15:46:53.072Z",
} as const satisfies PartOfSpeech
