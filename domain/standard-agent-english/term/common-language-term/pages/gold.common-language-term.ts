import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const gold = {
  id: "01a0c62d-9f2b-7ac0-8674-0e2562cee0a5",
  type: "page-type/common-language-term",
  slug: "gold",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "gold" }],
} as const satisfies CommonLanguageTerm
