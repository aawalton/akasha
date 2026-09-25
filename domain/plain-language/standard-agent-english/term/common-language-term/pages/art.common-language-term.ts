import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const art = {
  id: "01a0d8bd-93fa-78a0-b1fa-85c545e5b495",
  type: "page-type/common-language-term",
  slug: "art",
  definition: "work made to be seen for its beauty",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "art" }],
} as const satisfies CommonLanguageTerm
