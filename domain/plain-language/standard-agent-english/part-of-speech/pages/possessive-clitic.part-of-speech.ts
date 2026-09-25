import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const possessiveClitic = {
  id: "01a0c92e-53e6-73a0-8ff4-bed61e10ef2a",
  type: "page-type/part-of-speech",
  slug: "possessive-clitic",
  definition: "the mark saying the noun after it belongs to the noun before it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This mark is written onto the end of the word before it rather than after a space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word closing with this mark is read as that word and this mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This mark is written onto a noun run rather than onto a longer phrase.",
    },
  ],
} as const satisfies PartOfSpeech
