import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const from = {
  id: "01a0c58f-662d-74a1-9253-00008ae1ebb4",
  type: "page-type/common-language-term",
  slug: "from",
  definition: "the preposition naming where a thing comes out of",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "from" }],
} as const satisfies CommonLanguageTerm
