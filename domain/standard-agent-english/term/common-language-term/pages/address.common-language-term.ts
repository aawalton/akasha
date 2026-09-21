import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const address = {
  id: "01a0c625-fd7a-7cde-897d-69e1d050c300",
  type: "page-type/common-language-term",
  slug: "address",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "address" },
    { partOfSpeech: "part-of-speech/noun", spelling: "addresses" },
  ],
} as const satisfies CommonLanguageTerm
