import type { PartOfSpeech } from "akasha/domain/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const infinitiveMarker = {
  id: "01a0d57c-f7ff-765a-bd96-6a5fc51221c6",
  type: "page-type/part-of-speech",
  slug: "infinitive-marker",
  definition: "the word to before a verb",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The verb after an infinitive marker is the plain form.",
    },
  ],
} as const satisfies PartOfSpeech
