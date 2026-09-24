import type { PartOfSpeech } from "akasha/domain/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const degreeAdverb = {
  id: "01a0d5ce-a903-71e5-a015-28ac1c18d8ad",
  type: "page-type/part-of-speech",
  slug: "degree-adverb",
  definition: "a word saying how much of a quality applies",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A degree adverb comes before the adjective it measures.",
    },
  ],
} as const satisfies PartOfSpeech
