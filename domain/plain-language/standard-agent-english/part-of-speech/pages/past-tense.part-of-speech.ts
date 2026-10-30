import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const pastTense = {
  id: "01a18da7-86b8-7ec9-94b0-315050e31087",
  type: "page-type/part-of-speech",
  slug: "past-tense",
  definition: "a word saying what a thing did",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A spelling that is both this and a past participle is stated as each.",
    },
  ],
  createdAt: "2026-10-30T16:32:08.887Z",
  updatedAt: "2026-10-30T16:32:08.887Z",
} as const satisfies PartOfSpeech
