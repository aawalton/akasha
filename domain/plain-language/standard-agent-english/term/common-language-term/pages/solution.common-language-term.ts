import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const solution = {
  id: "01a0d90d-7ecc-7ec3-81b1-2fc3af0ed712",
  type: "page-type/common-language-term",
  slug: "solution",
  definition: "a way of making a problem go away",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "solution" },
    { partOfSpeech: "part-of-speech/noun", spelling: "solutions" },
  ],
  createdAt: "2026-09-25T14:52:15.436Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
