import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const keyboard = {
  id: "01a0c626-80df-7fee-82dd-cda2907d3e33",
  type: "page-type/common-language-term",
  slug: "keyboard",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "keyboard" },
    { partOfSpeech: "part-of-speech/noun", spelling: "keyboards" },
  ],
} as const satisfies CommonLanguageTerm
