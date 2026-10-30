import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const see = {
  id: "01a18dce-e306-75d2-ad6c-47775bfd13a3",
  type: "page-type/common-language-term",
  slug: "see",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "see" },
    { partOfSpeech: "part-of-speech/verb", spelling: "sees" },
    { partOfSpeech: "part-of-speech/past-tense", spelling: "saw" },
  ],
  createdAt: "2026-10-30T17:15:08.420Z",
  updatedAt: "2026-10-30T17:15:08.420Z",
} as const satisfies CommonLanguageTerm
