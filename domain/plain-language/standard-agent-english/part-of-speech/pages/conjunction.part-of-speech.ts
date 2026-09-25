import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const conjunction = {
  id: "01a0c60f-289f-7bbf-be7b-ae0e872a03e0",
  type: "page-type/part-of-speech",
  slug: "conjunction",
  definition: "a word joining two phrases",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "conjunction" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A conjunction is a closed class, so the words here are nearly all there are.",
    },
  ],
} as const satisfies PartOfSpeech
