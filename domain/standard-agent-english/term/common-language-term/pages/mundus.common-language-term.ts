import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const mundus = {
  id: "01a0c62c-d549-7189-9de7-984f6eddba05",
  type: "page-type/common-language-term",
  slug: "mundus",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "mundus" }],
} as const satisfies CommonLanguageTerm
