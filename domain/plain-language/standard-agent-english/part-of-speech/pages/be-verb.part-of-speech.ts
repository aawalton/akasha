import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const beVerb = {
  id: "01a0c9a2-9f69-7a7f-8640-d64519676c3f",
  type: "page-type/part-of-speech",
  slug: "be-verb",
  definition: "a form of the word be",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This word says nothing of its own, and the word after it says what was done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A form of be with no past participle after it does another job, named on no page yet.",
    },
  ],
} as const satisfies PartOfSpeech
