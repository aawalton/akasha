import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const bring = {
  id: "01a18d59-50f7-7911-9ff3-0225470fe354",
  type: "page-type/common-language-term",
  slug: "bring",
  definition: "to take something to a place",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "bring" },
    { partOfSpeech: "part-of-speech/verb", spelling: "brings" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "brought" },
  ],
  createdAt: "2026-10-30T15:06:43.318Z",
  updatedAt: "2026-10-30T15:06:43.318Z",
} as const satisfies CommonLanguageTerm
