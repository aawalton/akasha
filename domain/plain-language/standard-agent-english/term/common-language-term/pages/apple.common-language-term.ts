import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const apple = {
  id: "01a18d7a-7b10-71ff-ae0c-66dc76475481",
  type: "page-type/common-language-term",
  slug: "apple",
  definition: "the company that makes Alan's phone",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Apple" }],
  createdAt: "2026-10-30T15:42:56.783Z",
  updatedAt: "2026-10-30T15:42:56.783Z",
} as const satisfies CommonLanguageTerm
