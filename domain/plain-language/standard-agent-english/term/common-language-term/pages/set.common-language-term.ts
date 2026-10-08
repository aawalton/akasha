import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const set = {
  id: "01a0cab2-aeff-77e8-9769-5c4a76421a30",
  type: "page-type/common-language-term",
  slug: "set",
  definition: "put to the value somebody decided on, or a group of things taken together",
  spellings: [
    { partOfSpeech: "part-of-speech/past-participle", spelling: "set" },
    { partOfSpeech: "part-of-speech/noun", spelling: "set" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sets" },
  ],
  createdAt: "2026-09-22T19:58:22.975Z",
  updatedAt: "2026-09-25T16:16:47.000Z",
} as const satisfies CommonLanguageTerm
