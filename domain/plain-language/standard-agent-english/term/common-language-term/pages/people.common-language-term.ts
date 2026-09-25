import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const people = {
  id: "01a0d4d1-ee04-7ded-8ae0-4609d796acea",
  type: "page-type/common-language-term",
  slug: "people",
  definition: "humans in general",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "people" }],
} as const satisfies CommonLanguageTerm
