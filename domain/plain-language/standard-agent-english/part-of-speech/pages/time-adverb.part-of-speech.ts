import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const timeAdverb = {
  id: "01a18dc3-91cf-7bb7-82da-79a99fbe760a",
  type: "page-type/part-of-speech",
  slug: "time-adverb",
  definition: "a word saying when a thing was done among the times it was done",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This word is written only after a proper noun and before a past tense.",
    },
  ],
  createdAt: "2026-10-30T17:02:46.734Z",
  updatedAt: "2026-10-30T17:02:46.734Z",
} as const satisfies PartOfSpeech
