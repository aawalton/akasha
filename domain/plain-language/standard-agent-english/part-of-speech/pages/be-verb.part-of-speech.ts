import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const beVerb = {
  id: "01a0c9a2-9f69-7a7f-8640-d64519676c3f",
  type: "page-type/part-of-speech",
  slug: "be-verb",
  definition: "a form of the word be",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This word says nothing of its own, and the words after it say what the subject is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A form of be is followed by a participle, an adjective, a negator or a degree adverb.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A form of be ends a clause only where a degree adverb opens that clause.",
    },
  ],
  createdAt: "2026-09-22T15:01:13.193Z",
  updatedAt: "2026-10-30T15:51:38.323Z",
} as const satisfies PartOfSpeech
