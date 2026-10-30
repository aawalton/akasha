import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const zero = {
  id: "01a18d99-08fc-766c-9e4a-240847747102",
  type: "page-type/common-language-term",
  slug: "zero",
  definition: "the number of things in a list with no things",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "zero" },
    { partOfSpeech: "part-of-speech/noun", spelling: "zeros" },
  ],
  createdAt: "2026-10-30T16:16:19.194Z",
  updatedAt: "2026-10-30T16:16:19.194Z",
} as const satisfies CommonLanguageTerm
