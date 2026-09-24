import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const eat = {
  id: "01a0d5bf-edfa-7cc1-ad6a-caecdb96a161",
  type: "page-type/common-language-term",
  slug: "eat",
  definition: "to take food into the body",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "eat" },
    { partOfSpeech: "part-of-speech/verb", spelling: "eats" },
  ],
} as const satisfies CommonLanguageTerm
