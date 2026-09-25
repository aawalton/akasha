import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const training = {
  id: "01a0d8b7-4842-7e80-9bca-6eff45e28f1c",
  type: "page-type/common-language-term",
  slug: "training",
  definition: "exercise done to grow stronger",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "training" }],
} as const satisfies CommonLanguageTerm
