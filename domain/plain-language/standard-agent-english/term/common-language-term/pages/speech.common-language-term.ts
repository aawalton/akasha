import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const speech = {
  id: "01a0d975-8750-74e4-a523-b1f3c4550c52",
  type: "page-type/common-language-term",
  slug: "speech",
  definition: "spoken words",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "speech" }],
} as const satisfies CommonLanguageTerm
