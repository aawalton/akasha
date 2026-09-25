import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const its = {
  id: "01a0d8d8-acea-7fe6-8854-6abfc8be6f65",
  type: "page-type/common-language-term",
  slug: "its",
  definition: "belonging to it",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "its" }],
} as const satisfies CommonLanguageTerm
