import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const laptop = {
  id: "01a18d78-0934-7ae0-8d92-fb6f4e401b18",
  type: "page-type/common-language-term",
  slug: "laptop",
  definition: "a computer a person carries",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "laptop" },
    { partOfSpeech: "part-of-speech/noun", spelling: "laptops" },
  ],
  createdAt: "2026-10-30T15:40:16.563Z",
  updatedAt: "2026-10-30T15:40:16.563Z",
} as const satisfies CommonLanguageTerm
