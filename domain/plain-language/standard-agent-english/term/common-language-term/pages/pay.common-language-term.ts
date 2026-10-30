import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const pay = {
  id: "01a18d61-4ad3-79d6-99c1-67c348c02350",
  type: "page-type/common-language-term",
  slug: "pay",
  definition: "how a person gives money for a thing",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "pay" },
    { partOfSpeech: "part-of-speech/verb", spelling: "pays" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "paid" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "paying" },
  ],
  createdAt: "2026-10-30T15:15:26.033Z",
  updatedAt: "2026-10-30T15:15:26.033Z",
} as const satisfies CommonLanguageTerm
