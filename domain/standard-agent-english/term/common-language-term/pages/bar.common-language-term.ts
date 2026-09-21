import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const bar = {
  id: "01a0c626-c9d2-7cb5-b548-e97f241b4d8b",
  type: "page-type/common-language-term",
  slug: "bar",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "bar" },
    { partOfSpeech: "part-of-speech/noun", spelling: "bars" },
  ],
} as const satisfies CommonLanguageTerm
