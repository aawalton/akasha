import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const time = {
  id: "01a0d96c-5040-7c7d-a398-a1ff3049f733",
  type: "page-type/common-language-term",
  slug: "time",
  definition: "how long something lasts, or the point when it happens",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "time" },
    { partOfSpeech: "part-of-speech/noun", spelling: "times" },
  ],
} as const satisfies CommonLanguageTerm
