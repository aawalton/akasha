import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const fishing = {
  id: "01a0c62b-72c6-7ed6-bfea-0a126f3b06a1",
  type: "page-type/common-language-term",
  slug: "fishing",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "fishing" }],
} as const satisfies CommonLanguageTerm
