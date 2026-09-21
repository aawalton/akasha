import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const character = {
  id: "01a0c600-7438-7bc5-936f-fb5e1e26ab55",
  type: "page-type/common-language-term",
  slug: "character",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "character" },
    { partOfSpeech: "part-of-speech/noun", spelling: "characters" },
  ],
} as const satisfies CommonLanguageTerm
