import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const listing = {
  id: "01a0c626-6e63-71a3-ac3b-212214b934c7",
  type: "page-type/common-language-term",
  slug: "listing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "listing" },
    { partOfSpeech: "part-of-speech/noun", spelling: "listings" },
  ],
} as const satisfies CommonLanguageTerm
