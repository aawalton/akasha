import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const problem = {
  id: "01a0d90d-7ecc-7646-9f83-aea028100d25",
  type: "page-type/common-language-term",
  slug: "problem",
  definition: "something that is hard to deal with",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "problem" },
    { partOfSpeech: "part-of-speech/noun", spelling: "problems" },
  ],
  createdAt: "2026-09-25T14:52:15.436Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
