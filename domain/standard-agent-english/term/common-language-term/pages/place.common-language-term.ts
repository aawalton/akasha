import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const place = {
  id: "01a0c622-1b99-7904-9474-bf5e2408d95a",
  type: "page-type/common-language-term",
  slug: "place",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "place" },
    { partOfSpeech: "part-of-speech/noun", spelling: "places" },
  ],
} as const satisfies CommonLanguageTerm
