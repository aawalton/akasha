import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hold = {
  id: "01a18d49-2823-70d3-84bd-1a6310b79d53",
  type: "page-type/common-language-term",
  slug: "hold",
  definition: "to have or keep inside",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "hold" },
    { partOfSpeech: "part-of-speech/verb", spelling: "holds" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "held" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "holding" },
  ],
  createdAt: "2026-10-30T14:49:04.288Z",
  updatedAt: "2026-10-30T14:49:04.288Z",
} as const satisfies CommonLanguageTerm
