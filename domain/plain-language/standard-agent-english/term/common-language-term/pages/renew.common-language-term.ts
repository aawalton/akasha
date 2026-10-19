import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const renew = {
  id: "01a1557b-a7cb-7679-9069-d9e3d0143921",
  type: "page-type/common-language-term",
  slug: "renew",
  definition: "going on for another period",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "renew" },
    { partOfSpeech: "part-of-speech/verb", spelling: "renews" },
  ],
  createdAt: "2026-10-19T18:45:29.674Z",
  updatedAt: "2026-10-19T18:45:29.674Z",
} as const satisfies CommonLanguageTerm
