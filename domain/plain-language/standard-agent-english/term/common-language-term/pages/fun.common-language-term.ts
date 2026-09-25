import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const fun = {
  id: "01a0d91b-e89c-73ea-823e-d470b4bea5e9",
  type: "page-type/common-language-term",
  slug: "fun",
  definition: "enjoyable for its own sake",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "fun" }],
} as const satisfies CommonLanguageTerm
