import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sell = {
  id: "01a0d494-7f1b-7333-b87e-614cf1a1d030",
  type: "page-type/common-language-term",
  slug: "sell",
  definition: "to give a thing for money",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "sell" },
    { partOfSpeech: "part-of-speech/verb", spelling: "sells" },
  ],
} as const satisfies CommonLanguageTerm
