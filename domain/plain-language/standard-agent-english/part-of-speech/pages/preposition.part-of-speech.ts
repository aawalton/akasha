import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

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
      statement: "`to` marking an infinitive does another job, named on no page yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A preposition names the noun phrase after it, and is never left at the end of a clause.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause closing with a preposition is restated, most often as a possessive.",
    },
  ],
} as const satisfies PartOfSpeech
