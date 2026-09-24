import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const stress = {
  id: "01a0d589-bd20-7cd5-93b5-32b0ed60f678",
  type: "page-type/common-language-term",
  slug: "stress",
  definition: "strain on the mind or body",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "stress" }],
} as const satisfies CommonLanguageTerm
