import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const list = {
  id: "01a0c623-70db-701c-8781-422121f253c8",
  type: "page-type/common-language-term",
  slug: "list",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "list" },
    { partOfSpeech: "part-of-speech/noun", spelling: "lists" },
  ],
} as const satisfies CommonLanguageTerm
