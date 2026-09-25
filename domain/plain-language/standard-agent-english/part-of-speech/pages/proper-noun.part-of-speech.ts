import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const properNoun = {
  id: "01a0d483-e67e-7930-8ee9-f77a85c1f876",
  type: "page-type/part-of-speech",
  slug: "proper-noun",
  definition: "a word naming one thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "proper noun" },
    { partOfSpeech: "part-of-speech/noun", spelling: "proper nouns" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A proper noun is written with a capital on each of its words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name ending in a common noun is a noun rather than a proper noun.",
    },
  ],
} as const satisfies PartOfSpeech
