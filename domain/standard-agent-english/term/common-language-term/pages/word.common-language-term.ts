import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const word = {
  id: "01a0c603-3a2b-7143-950e-dfcabe53b09c",
  type: "page-type/common-language-term",
  slug: "word",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "word" },
    { partOfSpeech: "part-of-speech/noun", spelling: "words" },
  ],
} as const satisfies CommonLanguageTerm
