import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const damage = {
  id: "01a0c629-7be9-7b84-972c-3e6a3d8823cd",
  type: "page-type/common-language-term",
  slug: "damage",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "damage" }],
} as const satisfies CommonLanguageTerm
