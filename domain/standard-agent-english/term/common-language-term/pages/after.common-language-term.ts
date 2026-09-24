import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const after = {
  id: "01a0d3e0-7b13-7b8c-9d28-5cd88ff07d67",
  type: "page-type/common-language-term",
  slug: "after",
  definition: "the preposition naming what a thing comes later than",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "after" }],
} as const satisfies CommonLanguageTerm
