import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tries = {
  id: "01a18db4-cb17-7005-accd-7581ff5bf3bd",
  type: "page-type/common-language-term",
  slug: "tries",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "try" },
    { partOfSpeech: "part-of-speech/verb", spelling: "tries" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "tried" },
  ],
  createdAt: "2026-10-30T16:46:38.359Z",
  updatedAt: "2026-10-30T16:46:38.359Z",
} as const satisfies CommonLanguageTerm
