import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const measure = {
  id: "01a0d8b5-2706-7e30-adfb-baa3666319b7",
  type: "page-type/common-language-term",
  slug: "measure",
  definition: "to find how much of something there is",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "measure" },
    { partOfSpeech: "part-of-speech/verb", spelling: "measures" },
  ],
} as const satisfies CommonLanguageTerm
