import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const language = {
  id: "01a0d8e7-fcc9-73ff-8522-33fdf74f9216",
  type: "page-type/common-language-term",
  slug: "language",
  definition: "a set of words and rules for writing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "language" },
    { partOfSpeech: "part-of-speech/noun", spelling: "languages" },
  ],
} as const satisfies CommonLanguageTerm
