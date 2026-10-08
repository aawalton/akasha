import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const that = {
  id: "01a0c62b-06ba-7ea6-b21c-c52588626441",
  type: "page-type/common-language-term",
  slug: "that",
  spellings: [
    { partOfSpeech: "part-of-speech/determiner", spelling: "that" },
    { partOfSpeech: "part-of-speech/determiner", spelling: "those" },
    { partOfSpeech: "part-of-speech/relative-pronoun", spelling: "that" },
  ],
  createdAt: "2026-09-21T22:51:43.674Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
