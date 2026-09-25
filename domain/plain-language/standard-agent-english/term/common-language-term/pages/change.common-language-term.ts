import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const change = {
  id: "01a0d8c9-81d1-772c-81e6-ddd80172f933",
  type: "page-type/common-language-term",
  slug: "change",
  definition: "to make different",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "change" },
    { partOfSpeech: "part-of-speech/verb", spelling: "changes" },
  ],
} as const satisfies CommonLanguageTerm
