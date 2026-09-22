import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const word = {
  id: "01a0ca64-b42c-7a4e-ba85-56fcc52a25f4",
  type: "page-type/common-language-term",
  slug: "word",
  definition: "one of the pieces a phrase is written from",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "word" },
    { partOfSpeech: "part-of-speech/noun", spelling: "words" },
  ],
} as const satisfies CommonLanguageTerm
