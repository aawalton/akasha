import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const rule = {
  id: "01a0c623-e4d0-79b2-aea5-d48c54c0fbe7",
  type: "page-type/common-language-term",
  slug: "rule",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "rule" },
    { partOfSpeech: "part-of-speech/noun", spelling: "rules" },
  ],
} as const satisfies CommonLanguageTerm
