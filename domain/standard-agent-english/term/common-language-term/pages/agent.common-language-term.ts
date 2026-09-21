import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const agent = {
  id: "01a0c600-1426-772e-9eb8-5bdd6fdf145c",
  type: "page-type/common-language-term",
  slug: "agent",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "agent" }],
} as const satisfies CommonLanguageTerm
