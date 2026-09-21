import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const inventory = {
  id: "01a0c62d-66f2-7b50-8ddd-4f75e71b8d20",
  type: "page-type/common-language-term",
  slug: "inventory",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "inventory" }],
} as const satisfies CommonLanguageTerm
