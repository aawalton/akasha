import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const affect = {
  id: "01a0d88d-d249-7be2-a735-fe23b0184e6e",
  type: "page-type/common-language-term",
  slug: "affect",
  definition: "to change something",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "affect" },
    { partOfSpeech: "part-of-speech/verb", spelling: "affects" },
  ],
} as const satisfies CommonLanguageTerm
