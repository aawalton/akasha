import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const site = {
  id: "01a0c629-d720-7a7b-aa00-243be5b73252",
  type: "page-type/common-language-term",
  slug: "site",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "site" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sites" },
  ],
} as const satisfies CommonLanguageTerm
