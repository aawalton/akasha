import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const batch = {
  id: "01a18d8c-5bd2-7d04-a1a5-3dcadae23642",
  type: "page-type/common-language-term",
  slug: "batch",
  definition: "a group of things handled together",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "batch" },
    { partOfSpeech: "part-of-speech/noun", spelling: "batches" },
  ],
  createdAt: "2026-10-30T16:02:28.433Z",
  updatedAt: "2026-10-30T16:02:28.433Z",
} as const satisfies CommonLanguageTerm
