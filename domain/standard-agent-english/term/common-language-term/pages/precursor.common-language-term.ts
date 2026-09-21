import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const precursor = {
  id: "01a0c62c-e614-7841-aaa1-6bdeb1eebd2e",
  type: "page-type/common-language-term",
  slug: "precursor",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "precursor" }],
} as const satisfies CommonLanguageTerm
