import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const emoji = {
  id: "01a18d98-957e-7cd6-a7e3-2b0eadb1d8f9",
  type: "page-type/common-language-term",
  slug: "emoji",
  definition: "an image that is written in text",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "emoji" },
    { partOfSpeech: "part-of-speech/noun", spelling: "emojis" },
  ],
  createdAt: "2026-10-30T16:15:49.628Z",
  updatedAt: "2026-10-30T16:15:49.628Z",
} as const satisfies CommonLanguageTerm
