import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const fresh = {
  id: "01a0c5f9-b3e4-7a2f-bcb3-210e6ff5149b",
  type: "page-type/common-language-term",
  slug: "fresh",
  definition: "the adjective naming a thing made now rather than taken from before",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "fresh" }],
} as const satisfies CommonLanguageTerm
