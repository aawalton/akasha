import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const state = {
  id: "01a0c602-b701-70d5-b45c-89410117f2ba",
  type: "page-type/common-language-term",
  slug: "state",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "state" }],
} as const satisfies CommonLanguageTerm
