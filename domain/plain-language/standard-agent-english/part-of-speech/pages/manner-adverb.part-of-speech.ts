import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const mannerAdverb = {
  id: "01a0d8f3-810b-7508-9ea4-78060a8bdfb1",
  type: "page-type/part-of-speech",
  slug: "manner-adverb",
  definition: "a word saying how something is done",
} as const satisfies PartOfSpeech
