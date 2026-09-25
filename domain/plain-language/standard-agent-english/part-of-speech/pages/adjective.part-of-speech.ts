import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const adjective = {
  id: "01a0c5f9-2164-7ac3-93fa-caec20932926",
  type: "page-type/part-of-speech",
  slug: "adjective",
  definition: "a word describing the thing a noun names",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "adjective" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An adjective is written before the noun group that adjective describes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word ending in `ed` or `ing` is a participle rather than an adjective here.",
    },
  ],
} as const satisfies PartOfSpeech
