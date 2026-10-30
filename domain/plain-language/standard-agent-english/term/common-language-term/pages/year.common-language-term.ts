import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const year = {
  id: "01a18d41-0ba6-7838-a8d3-a650b836f0bf",
  type: "page-type/common-language-term",
  slug: "year",
  definition: "the time the earth takes to go once around the sun",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "year" },
    { partOfSpeech: "part-of-speech/noun", spelling: "years" },
  ],
  createdAt: "2026-10-30T14:40:12.709Z",
  updatedAt: "2026-10-30T14:40:12.709Z",
} as const satisfies CommonLanguageTerm
