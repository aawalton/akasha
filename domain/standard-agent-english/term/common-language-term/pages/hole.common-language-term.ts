import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hole = {
  id: "01a0c623-4822-78ef-9f39-ae7a1b2da3bb",
  type: "page-type/common-language-term",
  slug: "hole",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "hole" },
    { partOfSpeech: "part-of-speech/noun", spelling: "holes" },
  ],
} as const satisfies CommonLanguageTerm
