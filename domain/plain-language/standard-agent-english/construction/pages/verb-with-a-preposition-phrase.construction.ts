import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const verbWithAPrepositionPhrase = {
  id: "01a0ca8e-3580-7bf3-a4fe-4b178e25cfd2",
  type: "page-type/construction",
  slug: "verb-with-a-preposition-phrase",
  definition: "a verb phrase written from a verb and the preposition phrase that verb acts through",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/verb", "phrase-kind/preposition-phrase"],
  admits: ["talks to a seat", "runs over temper", "reads from a page"],
  refuses: ["to a seat talks", "talks to"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A verb acting on a noun phrase directly is written by the other construction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A second preposition phrase is read as part of the noun phrase the first one names.",
    },
  ],
} as const satisfies Construction
