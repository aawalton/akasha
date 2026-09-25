import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const keyboard = {
  id: "01a0d8ec-e687-7538-acbb-42472aa18925",
  type: "page-type/common-language-term",
  slug: "keyboard",
  definition: "the keys a person types on",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "keyboard" },
    { partOfSpeech: "part-of-speech/noun", spelling: "keyboards" },
  ],
} as const satisfies CommonLanguageTerm
