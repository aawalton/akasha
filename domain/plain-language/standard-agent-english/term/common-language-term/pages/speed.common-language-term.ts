import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const speed = {
  id: "01a18d5b-cbf7-740b-a3f9-5ae0b680a3fe",
  type: "page-type/common-language-term",
  slug: "speed",
  definition: "how fast a thing moves",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "speed" },
    { partOfSpeech: "part-of-speech/noun", spelling: "speeds" },
  ],
  createdAt: "2026-10-30T15:09:25.878Z",
  updatedAt: "2026-10-30T15:09:25.878Z",
} as const satisfies CommonLanguageTerm
