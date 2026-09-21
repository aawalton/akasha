import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const map = {
  id: "01a0c623-10a1-7ddc-a0a4-f3c9de894525",
  type: "page-type/common-language-term",
  slug: "map",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "map" },
    { partOfSpeech: "part-of-speech/noun", spelling: "maps" },
  ],
} as const satisfies CommonLanguageTerm
