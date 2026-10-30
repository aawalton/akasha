import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const opening = {
  id: "01a18d56-41f2-7dfe-9ff7-285cfb7cc492",
  type: "page-type/common-language-term",
  slug: "opening",
  definition: "the first part of something, such as the first moves of a game",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "opening" },
    { partOfSpeech: "part-of-speech/noun", spelling: "openings" },
  ],
  createdAt: "2026-10-30T15:03:22.864Z",
  updatedAt: "2026-10-30T15:03:22.864Z",
} as const satisfies CommonLanguageTerm
