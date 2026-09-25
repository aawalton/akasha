import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const company = {
  id: "01a0d494-7629-7217-9b58-4552696c1680",
  type: "page-type/common-language-term",
  slug: "company",
  definition: "a business people run together",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "company" },
    { partOfSpeech: "part-of-speech/noun", spelling: "companies" },
  ],
} as const satisfies CommonLanguageTerm
