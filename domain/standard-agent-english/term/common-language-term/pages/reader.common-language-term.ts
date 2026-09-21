import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const reader = {
  id: "01a0c624-fb1f-7985-90e3-7dfc47191ee1",
  type: "page-type/common-language-term",
  slug: "reader",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "reader" },
    { partOfSpeech: "part-of-speech/noun", spelling: "readers" },
  ],
} as const satisfies CommonLanguageTerm
