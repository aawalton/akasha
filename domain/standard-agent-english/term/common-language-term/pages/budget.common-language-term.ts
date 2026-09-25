import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const budget = {
  id: "01a0d911-1c2d-7af9-8af1-a404ee2fefbb",
  type: "page-type/common-language-term",
  slug: "budget",
  definition: "an amount set aside to spend",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "budget" },
    { partOfSpeech: "part-of-speech/noun", spelling: "budgets" },
  ],
} as const satisfies CommonLanguageTerm
