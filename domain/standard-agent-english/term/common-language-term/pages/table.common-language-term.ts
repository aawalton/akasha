import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const table = {
  id: "01a0c602-c9c0-79bd-a34f-707fa5b50fd9",
  type: "page-type/common-language-term",
  slug: "table",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "table" }],
} as const satisfies CommonLanguageTerm
