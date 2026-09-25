import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const become = {
  id: "01a0d8b0-a07e-75f4-908f-7e5ca62dcc1a",
  type: "page-type/common-language-term",
  slug: "become",
  definition: "to come to be",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "become" },
    { partOfSpeech: "part-of-speech/verb", spelling: "becomes" },
  ],
} as const satisfies CommonLanguageTerm
