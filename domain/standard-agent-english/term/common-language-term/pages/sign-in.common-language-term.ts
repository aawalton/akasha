import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const signIn = {
  id: "01a0d588-3df6-7f88-8209-055d7463feec",
  type: "page-type/common-language-term",
  slug: "sign-in",
  definition: "to prove to a program who you are",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "sign in" },
    { partOfSpeech: "part-of-speech/verb", spelling: "signs in" },
  ],
} as const satisfies CommonLanguageTerm
