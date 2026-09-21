import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const top = {
  id: "01a0c62d-0989-7f60-adf4-479b9505f043",
  type: "page-type/common-language-term",
  slug: "top",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "top" }],
} as const satisfies CommonLanguageTerm
