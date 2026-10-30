import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const wear = {
  id: "01a18da4-f95a-7ceb-97df-cdd95dbb5726",
  type: "page-type/common-language-term",
  slug: "wear",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "wear" },
    { partOfSpeech: "part-of-speech/verb", spelling: "wears" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "worn" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "wearing" },
  ],
  createdAt: "2026-10-30T16:29:21.624Z",
  updatedAt: "2026-10-30T16:29:21.624Z",
} as const satisfies CommonLanguageTerm
