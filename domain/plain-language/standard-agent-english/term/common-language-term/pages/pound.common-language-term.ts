import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const pound = {
  id: "01a18d77-c4a6-78bc-b083-540a32e9a569",
  type: "page-type/common-language-term",
  slug: "pound",
  definition: "a unit of weight",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "pound" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pounds" },
  ],
  createdAt: "2026-10-30T15:39:59.013Z",
  updatedAt: "2026-10-30T15:39:59.013Z",
} as const satisfies CommonLanguageTerm
