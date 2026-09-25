import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const noun = {
  id: "01a0c564-f7af-72fe-a45d-895e26d8b701",
  type: "page-type/part-of-speech",
  slug: "noun",
  definition: "a word naming a thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "noun" },
    { partOfSpeech: "part-of-speech/noun", spelling: "nouns" },
  ],
} as const satisfies PartOfSpeech
