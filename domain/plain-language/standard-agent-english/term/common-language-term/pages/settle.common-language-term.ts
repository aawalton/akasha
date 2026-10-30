import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const settle = {
  id: "01a18d54-c81f-7bc4-9c23-715b921c4ae6",
  type: "page-type/common-language-term",
  slug: "settle",
  definition: "deciding a thing so it is no longer open",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "settle" },
    { partOfSpeech: "part-of-speech/verb", spelling: "settles" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "settled" },
  ],
  createdAt: "2026-10-30T15:01:46.142Z",
  updatedAt: "2026-10-30T15:01:46.142Z",
} as const satisfies CommonLanguageTerm
