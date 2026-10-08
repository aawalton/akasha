import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const name = {
  id: "01a0c933-cff5-7569-80c5-d7484baa2dfb",
  type: "page-type/common-language-term",
  slug: "name",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "name" },
    { partOfSpeech: "part-of-speech/noun", spelling: "names" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "named" },
  ],
  createdAt: "2026-09-22T13:00:11.125Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
