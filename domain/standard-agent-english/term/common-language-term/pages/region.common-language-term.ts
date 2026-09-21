import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const region = {
  id: "01a0c627-b3ad-72f1-80b6-50e98921cbb0",
  type: "page-type/common-language-term",
  slug: "region",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "region" },
    { partOfSpeech: "part-of-speech/noun", spelling: "regions" },
  ],
} as const satisfies CommonLanguageTerm
