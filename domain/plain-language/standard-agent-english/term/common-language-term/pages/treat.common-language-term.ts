import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const treat = {
  id: "01a18da5-6e25-750b-888d-0f75bd6d2771",
  type: "page-type/common-language-term",
  slug: "treat",
  definition: "act toward a person in some way",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "treat" },
    { partOfSpeech: "part-of-speech/verb", spelling: "treats" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "treated" },
  ],
  createdAt: "2026-10-30T16:29:51.522Z",
  updatedAt: "2026-10-30T16:29:51.522Z",
} as const satisfies CommonLanguageTerm
