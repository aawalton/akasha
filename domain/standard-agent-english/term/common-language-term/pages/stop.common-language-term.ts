import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const stop = {
  id: "01a0d3ee-4609-79c9-8be8-f3c77f483337",
  type: "page-type/common-language-term",
  slug: "stop",
  definition: "a thing ceasing to go",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "stop" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stops" },
  ],
} as const satisfies CommonLanguageTerm
