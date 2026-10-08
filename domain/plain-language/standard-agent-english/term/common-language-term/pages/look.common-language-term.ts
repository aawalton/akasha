import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const look = {
  id: "01a0d8b2-c81f-75af-a032-f5fb3357cca1",
  type: "page-type/common-language-term",
  slug: "look",
  definition: "to seem to the eye",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "look" },
    { partOfSpeech: "part-of-speech/verb", spelling: "looks" },
  ],
  createdAt: "2026-09-25T13:13:10.431Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
