import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const copy = {
  id: "01a0d9d7-f9cc-732b-a257-0882531446c0",
  type: "page-type/common-language-term",
  slug: "copy",
  definition: "a second of the same thing, or the making of one",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "copy" },
    { partOfSpeech: "part-of-speech/noun", spelling: "copies" },
    { partOfSpeech: "part-of-speech/verb", spelling: "copies" },
  ],
  createdAt: "2026-09-25T18:33:25.196Z",
  updatedAt: "2026-10-30T15:42:45.366Z",
} as const satisfies CommonLanguageTerm
