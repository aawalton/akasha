import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const field = {
  id: "01a0c600-bdeb-7c8a-96fd-d6c9a2e0a7e3",
  type: "page-type/common-language-term",
  slug: "field",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "field" },
    { partOfSpeech: "part-of-speech/noun", spelling: "fields" },
  ],
} as const satisfies CommonLanguageTerm
