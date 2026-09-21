import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const database = {
  id: "01a0c600-9875-7e3e-a11c-3e4d00cc6309",
  type: "page-type/common-language-term",
  slug: "database",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "database" }],
} as const satisfies CommonLanguageTerm
