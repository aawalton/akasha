import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const form = {
  id: "01a0c627-ea30-712a-8d1a-222f142fdb90",
  type: "page-type/common-language-term",
  slug: "form",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "form" },
    { partOfSpeech: "part-of-speech/noun", spelling: "forms" },
  ],
} as const satisfies CommonLanguageTerm
