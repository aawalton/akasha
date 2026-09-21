import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const armor = {
  id: "01a0c627-8e86-7610-b8d5-e5f3de1b0722",
  type: "page-type/common-language-term",
  slug: "armor",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "armor" }],
} as const satisfies CommonLanguageTerm
