import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const under = {
  id: "01a0c58f-e75e-7dba-847b-410559c2f623",
  type: "page-type/common-language-term",
  slug: "under",
  definition: "the preposition naming what a thing is below",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "under" }],
} as const satisfies CommonLanguageTerm
