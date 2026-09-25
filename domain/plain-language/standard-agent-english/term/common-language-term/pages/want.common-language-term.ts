import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const want = {
  id: "01a0d8b0-2f27-719b-8180-f5d412ec5047",
  type: "page-type/common-language-term",
  slug: "want",
  definition: "to wish for something",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "want" },
    { partOfSpeech: "part-of-speech/verb", spelling: "wants" },
  ],
} as const satisfies CommonLanguageTerm
