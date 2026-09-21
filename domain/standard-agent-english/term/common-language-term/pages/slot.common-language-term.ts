import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const slot = {
  id: "01a0c627-11b7-7fd3-909e-ff452802e3e3",
  type: "page-type/common-language-term",
  slug: "slot",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "slot" },
    { partOfSpeech: "part-of-speech/noun", spelling: "slots" },
  ],
} as const satisfies CommonLanguageTerm
