import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const belong = {
  id: "01a18d50-5334-7b20-98e2-6365d9edacaa",
  type: "page-type/common-language-term",
  slug: "belong",
  definition: "to be owned by or be a part of something",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "belong" },
    { partOfSpeech: "part-of-speech/verb", spelling: "belongs" },
  ],
  createdAt: "2026-10-30T14:56:54.060Z",
  updatedAt: "2026-10-30T14:56:54.060Z",
} as const satisfies CommonLanguageTerm
