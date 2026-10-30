import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const believe = {
  id: "01a18d3f-9fd8-7252-8e85-43010d342712",
  type: "page-type/common-language-term",
  slug: "believe",
  definition: "to hold something to be true",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "believe" },
    { partOfSpeech: "part-of-speech/verb", spelling: "believes" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "believed" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "believing" },
  ],
  createdAt: "2026-10-30T14:38:39.575Z",
  updatedAt: "2026-10-30T14:38:39.575Z",
} as const satisfies CommonLanguageTerm
