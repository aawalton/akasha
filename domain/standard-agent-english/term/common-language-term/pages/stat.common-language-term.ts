import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const stat = {
  id: "01a0c625-c39d-7a04-9e8d-f6aa6154c7bc",
  type: "page-type/common-language-term",
  slug: "stat",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "stat" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stats" },
  ],
} as const satisfies CommonLanguageTerm
