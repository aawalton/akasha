import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const determiner = {
  id: "01a0c582-f267-748c-986a-58d52a3bbf3b",
  type: "page-type/part-of-speech",
  slug: "determiner",
  definition: "a word saying which thing a noun group names",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "determiner" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A determiner is written before the noun group that determiner names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`a` and `an` are one term, and which spelling is written follows the next sound.",
    },
  ],
} as const satisfies PartOfSpeech
