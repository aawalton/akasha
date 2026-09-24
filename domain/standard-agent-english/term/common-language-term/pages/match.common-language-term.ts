import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const match = {
  id: "01a0d5ca-0853-7425-b64b-253b71b8bf0c",
  type: "page-type/common-language-term",
  slug: "match",
  definition: "to fit what is asked for",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "match" },
    { partOfSpeech: "part-of-speech/verb", spelling: "matches" },
  ],
} as const satisfies CommonLanguageTerm
