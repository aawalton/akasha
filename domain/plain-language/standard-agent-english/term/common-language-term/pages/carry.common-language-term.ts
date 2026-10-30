import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const carry = {
  id: "01a18d51-4fdc-7a6b-b0e2-d9c34b4a8ecd",
  type: "page-type/common-language-term",
  slug: "carry",
  definition: "to hold and bear along",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "carry" },
    { partOfSpeech: "part-of-speech/verb", spelling: "carries" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "carried" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "carrying" },
  ],
  createdAt: "2026-10-30T14:57:58.746Z",
  updatedAt: "2026-10-30T14:57:58.746Z",
} as const satisfies CommonLanguageTerm
