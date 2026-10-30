import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const inch = {
  id: "01a18d49-56cd-7900-a29c-0dda81bd104d",
  type: "page-type/common-language-term",
  slug: "inch",
  definition: "a twelfth of a foot, a short length",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "inch" },
    { partOfSpeech: "part-of-speech/noun", spelling: "inches" },
  ],
  createdAt: "2026-10-30T14:49:16.236Z",
  updatedAt: "2026-10-30T14:49:16.236Z",
} as const satisfies CommonLanguageTerm
