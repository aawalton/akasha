import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const replace = {
  id: "01a18da8-3422-7ef4-b34f-e50195f02fd3",
  type: "page-type/common-language-term",
  slug: "replace",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "replace" },
    { partOfSpeech: "part-of-speech/verb", spelling: "replaces" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "replaced" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "replacing" },
  ],
  createdAt: "2026-10-30T16:32:53.280Z",
  updatedAt: "2026-10-30T16:32:53.280Z",
} as const satisfies CommonLanguageTerm
