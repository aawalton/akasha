import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const work = {
  id: "01a0d3cb-f4ea-7db3-8754-9af2855c3a5e",
  type: "page-type/common-language-term",
  slug: "work",
  definition: "what somebody is doing or has to do",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "work" }],
} as const satisfies CommonLanguageTerm
