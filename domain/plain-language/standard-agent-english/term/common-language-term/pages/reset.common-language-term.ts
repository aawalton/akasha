import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const reset = {
  id: "01a15571-f5f4-7fdf-a087-b879e0d753e9",
  type: "page-type/common-language-term",
  slug: "reset",
  definition: "starting something again",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "reset" },
    { partOfSpeech: "part-of-speech/verb", spelling: "resets" },
  ],
  createdAt: "2026-10-19T18:34:54.323Z",
  updatedAt: "2026-10-19T18:34:54.323Z",
} as const satisfies CommonLanguageTerm
