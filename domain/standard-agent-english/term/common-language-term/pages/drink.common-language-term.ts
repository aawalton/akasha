import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const drink = {
  id: "01a0c626-5ba5-7c2e-baa7-3351f69b4bfb",
  type: "page-type/common-language-term",
  slug: "drink",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "drink" },
    { partOfSpeech: "part-of-speech/noun", spelling: "drinks" },
  ],
} as const satisfies CommonLanguageTerm
