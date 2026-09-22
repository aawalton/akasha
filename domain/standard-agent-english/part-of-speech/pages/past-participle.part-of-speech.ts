import type { PartOfSpeech } from "akasha/domain/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const pastParticiple = {
  id: "01a0c950-0d9f-709d-9ac9-47260104de8d",
  type: "page-type/part-of-speech",
  slug: "past-participle",
  definition: "a word saying what was done to a thing",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word closing in -ed written before its noun is an adjective rather than one of these.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word closing in -ing is a present participle rather than one of these.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Who did the thing is left out, or is named by a preposition phrase after this word.",
    },
  ],
} as const satisfies PartOfSpeech
