import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const index = {
  id: "01a0c601-4fd0-7b0e-96af-65ae96e91d12",
  type: "page-type/common-language-term",
  slug: "index",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "index" }],
} as const satisfies CommonLanguageTerm
