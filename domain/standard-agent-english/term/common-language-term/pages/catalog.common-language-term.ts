import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const catalog = {
  id: "01a0c629-8f75-792b-897d-b6a96e590204",
  type: "page-type/common-language-term",
  slug: "catalog",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "catalog" },
    { partOfSpeech: "part-of-speech/noun", spelling: "catalogs" },
  ],
} as const satisfies CommonLanguageTerm
