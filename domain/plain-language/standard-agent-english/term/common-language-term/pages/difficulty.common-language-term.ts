import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const difficulty = {
  id: "01a18d59-134a-7231-8d09-2741fe3ed4af",
  type: "page-type/common-language-term",
  slug: "difficulty",
  definition: "how hard something is to do",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "difficulty" },
    { partOfSpeech: "part-of-speech/noun", spelling: "difficulties" },
  ],
  createdAt: "2026-10-30T15:06:27.529Z",
  updatedAt: "2026-10-30T15:06:27.529Z",
} as const satisfies CommonLanguageTerm
