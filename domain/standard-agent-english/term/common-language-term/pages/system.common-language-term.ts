import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const system = {
  id: "01a0c627-4709-744b-9cff-edc02b527800",
  type: "page-type/common-language-term",
  slug: "system",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "system" },
    { partOfSpeech: "part-of-speech/noun", spelling: "systems" },
  ],
} as const satisfies CommonLanguageTerm
