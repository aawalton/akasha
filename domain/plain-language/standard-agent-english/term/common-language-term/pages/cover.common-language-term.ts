import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const cover = {
  id: "01a18d59-6823-7dcc-8cfc-57890f51d813",
  type: "page-type/common-language-term",
  slug: "cover",
  definition: "to take in a span or a set of things",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "cover" },
    { partOfSpeech: "part-of-speech/verb", spelling: "covers" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "covered" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "covering" },
  ],
  createdAt: "2026-10-30T15:06:49.250Z",
  updatedAt: "2026-10-30T15:06:49.250Z",
} as const satisfies CommonLanguageTerm
