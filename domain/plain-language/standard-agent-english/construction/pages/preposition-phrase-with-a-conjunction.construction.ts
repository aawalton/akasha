import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const prepositionPhraseWithAConjunction = {
  id: "01a18d88-94a9-7151-8450-c151484ca333",
  type: "page-type/construction",
  slug: "preposition-phrase-with-a-conjunction",
  definition: "a preposition phrase written from two preposition phrases a conjunction joins",
  phraseKind: "phrase-kind/preposition-phrase",
  writtenFrom: [
    "phrase-kind/preposition-phrase",
    "part-of-speech/conjunction",
    "phrase-kind/preposition-phrase",
  ],
  admits: ["the time in New York or in Denver"],
  refuses: ["the time in New York or Denver in", "the time or in Denver"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two noun phrases joined inside a phrase read the whole two ways, so they are not written.",
    },
  ],
  createdAt: "2026-10-30T15:58:20.839Z",
  updatedAt: "2026-10-30T15:58:20.839Z",
} as const satisfies Construction
