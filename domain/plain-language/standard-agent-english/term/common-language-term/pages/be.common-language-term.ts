import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const be = {
  id: "01a0c9a3-44b0-7872-957d-4421e3f86a5b",
  type: "page-type/common-language-term",
  slug: "be",
  spellings: [
    { partOfSpeech: "part-of-speech/be-verb", spelling: "is" },
    { partOfSpeech: "part-of-speech/be-verb", spelling: "are" },
    { partOfSpeech: "part-of-speech/be-verb", spelling: "was" },
    { partOfSpeech: "part-of-speech/be-verb", spelling: "were" },
  ],
  createdAt: "2026-09-22T15:01:55.504Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
