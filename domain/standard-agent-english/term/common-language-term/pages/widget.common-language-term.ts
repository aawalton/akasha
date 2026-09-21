import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const widget = {
  id: "01a0c626-b6cf-7bc2-9af6-e7453442e0cb",
  type: "page-type/common-language-term",
  slug: "widget",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "widget" },
    { partOfSpeech: "part-of-speech/noun", spelling: "widgets" },
  ],
} as const satisfies CommonLanguageTerm
