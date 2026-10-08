import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const path = {
  id: "01a0d952-d639-7684-9ba7-3dd83fa25d03",
  type: "page-type/common-language-term",
  slug: "path",
  definition: "the folders that lead to a file or a folder",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "path" },
    { partOfSpeech: "part-of-speech/noun", spelling: "paths" },
  ],
  createdAt: "2026-09-25T16:07:59.801Z",
  updatedAt: "2026-09-25T16:08:02.000Z",
} as const satisfies CommonLanguageTerm
