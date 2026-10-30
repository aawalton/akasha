import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const observe = {
  id: "01a18db4-cb17-7b5f-ba22-013810eb8662",
  type: "page-type/common-language-term",
  slug: "observe",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "observe" },
    { partOfSpeech: "part-of-speech/verb", spelling: "observes" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "observed" },
  ],
  createdAt: "2026-10-30T16:46:38.359Z",
  updatedAt: "2026-10-30T16:46:38.359Z",
} as const satisfies CommonLanguageTerm
