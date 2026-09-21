import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const lore = {
  id: "01a0c623-96e9-74b0-aecd-c936345c4b8d",
  type: "page-type/common-language-term",
  slug: "lore",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "lore" }],
} as const satisfies CommonLanguageTerm
