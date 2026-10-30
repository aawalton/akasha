import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const group = {
  id: "01a18d78-69f4-7609-a200-db93329f9987",
  type: "page-type/common-language-term",
  slug: "group",
  definition: "things put together under one name",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "group" },
    { partOfSpeech: "part-of-speech/noun", spelling: "groups" },
  ],
  createdAt: "2026-10-30T15:40:41.331Z",
  updatedAt: "2026-10-30T15:40:41.331Z",
} as const satisfies CommonLanguageTerm
