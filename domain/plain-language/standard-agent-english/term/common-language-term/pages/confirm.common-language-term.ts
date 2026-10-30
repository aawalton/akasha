import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const confirm = {
  id: "01a18dab-d5c7-7f99-9f98-d6ab625a15d4",
  type: "page-type/common-language-term",
  slug: "confirm",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "confirm" },
    { partOfSpeech: "part-of-speech/verb", spelling: "confirms" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "confirmed" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "confirming" },
  ],
  createdAt: "2026-10-30T16:36:51.270Z",
  updatedAt: "2026-10-30T16:36:51.270Z",
} as const satisfies CommonLanguageTerm
