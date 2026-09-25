import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const call = {
  id: "01a0ca58-2fe6-7121-980d-7e028620e416",
  type: "page-type/common-language-term",
  slug: "call",
  definition: "putting a request to a program and taking its answer, as a session does to a model",
  spellings: [{ partOfSpeech: "part-of-speech/verb", spelling: "calls" }],
} as const satisfies CommonLanguageTerm
