import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const haveVerb = {
  id: "01a18d70-5d18-7a3b-a423-8f96129ed01f",
  type: "page-type/part-of-speech",
  slug: "have-verb",
  definition: "a form of the word have",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This word says nothing of its own, and the past participle after it says what was done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A form of have that says what a thing holds is a verb rather than this.",
    },
  ],
  createdAt: "2026-10-30T15:31:53.748Z",
  updatedAt: "2026-10-30T15:31:53.748Z",
} as const satisfies PartOfSpeech
