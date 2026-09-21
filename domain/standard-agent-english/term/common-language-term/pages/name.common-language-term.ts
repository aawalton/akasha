import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const name = {
  id: "01a0c622-feb3-7ef1-9cdf-45681be1355b",
  type: "page-type/common-language-term",
  slug: "name",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "name" },
    { partOfSpeech: "part-of-speech/noun", spelling: "names" },
  ],
} as const satisfies CommonLanguageTerm
