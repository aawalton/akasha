import type { PartOfSpeech } from "akasha/domain/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const preposition = {
  id: "01a0c58e-f68d-7a49-b538-7624b5cec8d5",
  type: "page-type/part-of-speech",
  slug: "preposition",
  definition: "a word saying how a noun phrase fits the thing that phrase follows",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "preposition" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A preposition is a closed class, so the words here are nearly all there are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`to` is no preposition here, because that word marks an infinitive as well.",
    },
  ],
} as const satisfies PartOfSpeech
