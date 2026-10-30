import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const password = {
  id: "01a18d61-555b-7717-b8b3-06da9862b224",
  type: "page-type/common-language-term",
  slug: "password",
  definition: "a secret word that opens an account",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "password" },
    { partOfSpeech: "part-of-speech/noun", spelling: "passwords" },
  ],
  createdAt: "2026-10-30T15:15:28.730Z",
  updatedAt: "2026-10-30T15:15:28.730Z",
} as const satisfies CommonLanguageTerm
