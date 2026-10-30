import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const remove = {
  id: "01a0d8cd-1ad0-7ca6-8eaa-92a50630ff9d",
  type: "page-type/common-language-term",
  slug: "remove",
  definition: "to take away",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "remove" },
    { partOfSpeech: "part-of-speech/verb", spelling: "removes" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "removed" },
  ],
  createdAt: "2026-09-25T13:41:55.536Z",
  updatedAt: "2026-10-30T17:38:00.944Z",
} as const satisfies CommonLanguageTerm
