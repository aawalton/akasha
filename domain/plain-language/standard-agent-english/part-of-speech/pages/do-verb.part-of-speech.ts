import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const doVerb = {
  id: "01a18d81-a3b4-7cbd-8754-3f9da4c914ea",
  type: "page-type/part-of-speech",
  slug: "do-verb",
  definition: "a form of the word do that carries a negator",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This word says nothing of its own, and the verb phrase after the negator says what is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A form of do that says what is carried out is a verb rather than this.",
    },
  ],
  createdAt: "2026-10-30T15:50:45.938Z",
  updatedAt: "2026-10-30T15:50:45.938Z",
} as const satisfies PartOfSpeech
