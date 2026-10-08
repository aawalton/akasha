import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const signUp = {
  id: "01a0d588-ffb7-715f-b5f7-5baab0b0131a",
  type: "page-type/common-language-term",
  slug: "sign-up",
  definition: "to make yourself known to a program for the first time",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "sign up" },
    { partOfSpeech: "part-of-speech/verb", spelling: "signs up" },
  ],
  createdAt: "2026-09-24T22:28:40.503Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
