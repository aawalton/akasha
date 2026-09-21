import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const fish = {
  id: "01a0c600-e215-7588-aa97-665c978646b5",
  type: "page-type/common-language-term",
  slug: "fish",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "fish" }],
} as const satisfies CommonLanguageTerm
