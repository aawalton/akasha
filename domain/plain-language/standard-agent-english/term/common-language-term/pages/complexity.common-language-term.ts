import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const complexity = {
  id: "01a0d95c-b5db-7eaf-a28e-fbe21dd02d01",
  type: "page-type/common-language-term",
  slug: "complexity",
  definition: "how hard something is to understand",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "complexity" }],
} as const satisfies CommonLanguageTerm
