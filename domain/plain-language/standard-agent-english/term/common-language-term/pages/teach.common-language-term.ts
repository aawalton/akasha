import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const teach = {
  id: "01a18d4a-5755-7911-a234-6927810babd3",
  type: "page-type/common-language-term",
  slug: "teach",
  definition: "help a person learn",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "teach" },
    { partOfSpeech: "part-of-speech/verb", spelling: "teaches" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "taught" },
  ],
  createdAt: "2026-10-30T14:50:21.907Z",
  updatedAt: "2026-10-30T14:50:21.907Z",
} as const satisfies CommonLanguageTerm
