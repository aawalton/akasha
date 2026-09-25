import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const scripture = {
  id: "01a0d8a6-f019-7acd-951c-5c83fd369c92",
  type: "page-type/common-language-term",
  slug: "scripture",
  definition: "writing a faith holds sacred",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "scripture" }],
} as const satisfies CommonLanguageTerm
