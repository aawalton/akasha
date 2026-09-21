import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const button = {
  id: "01a0c62d-43ef-7656-a305-11d89368a52f",
  type: "page-type/common-language-term",
  slug: "button",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "button" },
    { partOfSpeech: "part-of-speech/noun", spelling: "buttons" },
  ],
} as const satisfies CommonLanguageTerm
