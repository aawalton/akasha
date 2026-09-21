import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const intent = {
  id: "01a0c601-a23b-7fdf-8f98-19995d714efa",
  type: "page-type/common-language-term",
  slug: "intent",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "intent" }],
} as const satisfies CommonLanguageTerm
