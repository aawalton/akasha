import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const game = {
  id: "01a0c601-19e4-77a7-9732-e615dee92513",
  type: "page-type/common-language-term",
  slug: "game",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "game" }],
} as const satisfies CommonLanguageTerm
