import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const resource = {
  id: "01a0d980-57da-7c9b-b5e3-6a65710f2680",
  type: "page-type/common-language-term",
  slug: "resource",
  definition: "something that is drawn on to do work",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "resource" },
    { partOfSpeech: "part-of-speech/noun", spelling: "resources" },
  ],
  createdAt: "2026-09-25T16:57:42.106Z",
  updatedAt: "2026-09-25T16:57:46.000Z",
} as const satisfies CommonLanguageTerm
