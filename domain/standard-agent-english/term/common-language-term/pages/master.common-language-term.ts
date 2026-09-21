import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const master = {
  id: "01a0c62c-63bd-7e9d-bef5-270c3e0969f9",
  type: "page-type/common-language-term",
  slug: "master",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "master" }],
} as const satisfies CommonLanguageTerm
