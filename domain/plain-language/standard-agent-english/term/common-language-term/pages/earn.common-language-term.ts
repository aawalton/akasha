import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const earn = {
  id: "01a18d46-9f48-754b-81d2-9856b382fe34",
  type: "page-type/common-language-term",
  slug: "earn",
  definition: "to get something in return for what one does",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "earn" },
    { partOfSpeech: "part-of-speech/verb", spelling: "earns" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "earned" },
  ],
  createdAt: "2026-10-30T14:46:18.182Z",
  updatedAt: "2026-10-30T14:46:18.182Z",
} as const satisfies CommonLanguageTerm
