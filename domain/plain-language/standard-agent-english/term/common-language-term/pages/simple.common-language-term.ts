import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const simple = {
  id: "01a0d90e-743e-72ce-87c8-6dcc427f442f",
  type: "page-type/common-language-term",
  slug: "simple",
  definition: "made of few things",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "simple" }],
} as const satisfies CommonLanguageTerm
