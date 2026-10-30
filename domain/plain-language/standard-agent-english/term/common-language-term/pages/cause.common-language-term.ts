import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const cause = {
  id: "01a18d8e-6d01-74c3-aed4-a9da17098704",
  type: "page-type/common-language-term",
  slug: "cause",
  definition: "make a thing happen",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "cause" },
    { partOfSpeech: "part-of-speech/verb", spelling: "causes" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "caused" },
  ],
  createdAt: "2026-10-30T16:04:43.904Z",
  updatedAt: "2026-10-30T16:04:43.904Z",
} as const satisfies CommonLanguageTerm
