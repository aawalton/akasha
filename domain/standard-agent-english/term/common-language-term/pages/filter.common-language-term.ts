import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const filter = {
  id: "01a0c628-ea5e-741e-92cc-b15073102826",
  type: "page-type/common-language-term",
  slug: "filter",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "filter" },
    { partOfSpeech: "part-of-speech/noun", spelling: "filters" },
  ],
} as const satisfies CommonLanguageTerm
