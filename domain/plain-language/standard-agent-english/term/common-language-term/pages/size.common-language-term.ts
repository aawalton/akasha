import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const size = {
  id: "01a18d46-9130-7f95-9831-8f8e085342ff",
  type: "page-type/common-language-term",
  slug: "size",
  definition: "how big a thing is",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "size" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sizes" },
  ],
  createdAt: "2026-10-30T14:46:14.575Z",
  updatedAt: "2026-10-30T14:46:14.575Z",
} as const satisfies CommonLanguageTerm
