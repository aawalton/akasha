import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sing = {
  id: "01a18da9-85b7-7a6b-8e5c-5de5c328c568",
  type: "page-type/common-language-term",
  slug: "sing",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "sing" },
    { partOfSpeech: "part-of-speech/verb", spelling: "sings" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "sung" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "singing" },
  ],
  createdAt: "2026-10-30T16:34:19.702Z",
  updatedAt: "2026-10-30T16:34:19.702Z",
} as const satisfies CommonLanguageTerm
