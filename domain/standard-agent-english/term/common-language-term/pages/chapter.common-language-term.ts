import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const chapter = {
  id: "01a0c625-0f4e-7340-b9f8-1b6aee21d637",
  type: "page-type/common-language-term",
  slug: "chapter",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "chapter" },
    { partOfSpeech: "part-of-speech/noun", spelling: "chapters" },
  ],
} as const satisfies CommonLanguageTerm
