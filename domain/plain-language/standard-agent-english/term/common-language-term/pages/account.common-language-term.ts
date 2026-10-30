import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const account = {
  id: "01a18d55-426d-7a3b-be35-c6cacd12cf92",
  type: "page-type/common-language-term",
  slug: "account",
  definition: "a user's place on a service, under a name the user signs in with",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "account" },
    { partOfSpeech: "part-of-speech/noun", spelling: "accounts" },
  ],
  createdAt: "2026-10-30T15:02:17.450Z",
  updatedAt: "2026-10-30T15:02:17.450Z",
} as const satisfies CommonLanguageTerm
