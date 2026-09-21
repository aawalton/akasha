import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const header = {
  id: "01a0c62d-8d38-7337-89b6-f0a1df9c74f6",
  type: "page-type/common-language-term",
  slug: "header",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "header" },
    { partOfSpeech: "part-of-speech/noun", spelling: "headers" },
  ],
} as const satisfies CommonLanguageTerm
