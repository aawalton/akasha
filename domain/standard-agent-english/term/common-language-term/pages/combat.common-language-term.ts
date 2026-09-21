import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const combat = {
  id: "01a0c62d-5600-7377-9511-c6fa10a4a319",
  type: "page-type/common-language-term",
  slug: "combat",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "combat" }],
} as const satisfies CommonLanguageTerm
