import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const work = {
  id: "01a0c603-4bb9-72cb-8a2b-c85b04790d42",
  type: "page-type/common-language-term",
  slug: "work",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "work" }],
} as const satisfies CommonLanguageTerm
