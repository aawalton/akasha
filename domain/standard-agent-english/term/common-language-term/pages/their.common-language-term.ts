import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const their = {
  id: "01a0c62a-e01b-71b8-9923-f6a96b54bb89",
  type: "page-type/common-language-term",
  slug: "their",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "their" }],
} as const satisfies CommonLanguageTerm
