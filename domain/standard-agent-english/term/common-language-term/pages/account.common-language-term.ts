import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const account = {
  id: "01a0c600-01ef-779f-9432-ecc32afee319",
  type: "page-type/common-language-term",
  slug: "account",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "account" }],
} as const satisfies CommonLanguageTerm
