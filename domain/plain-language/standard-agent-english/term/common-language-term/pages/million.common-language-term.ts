import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const million = {
  id: "01a18d90-c10c-7ea1-b3fd-1b1689c1c2c3",
  type: "page-type/common-language-term",
  slug: "million",
  definition: "a thousand thousands",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "million" }],
  createdAt: "2026-10-30T16:07:16.491Z",
  updatedAt: "2026-10-30T16:07:16.491Z",
} as const satisfies CommonLanguageTerm
