import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const rune = {
  id: "01a0c62d-fe85-79cc-95bf-06f291bf6393",
  type: "page-type/common-language-term",
  slug: "rune",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "rune" },
    { partOfSpeech: "part-of-speech/noun", spelling: "runes" },
  ],
} as const satisfies CommonLanguageTerm
