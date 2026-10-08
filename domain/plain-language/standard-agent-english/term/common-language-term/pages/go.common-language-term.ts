import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const go = {
  id: "01a0d497-c523-729c-ada3-7b0677dc28e1",
  type: "page-type/common-language-term",
  slug: "go",
  definition: "to move from one place to another",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "go" },
    { partOfSpeech: "part-of-speech/verb", spelling: "goes" },
  ],
  createdAt: "2026-09-24T18:05:11.331Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
