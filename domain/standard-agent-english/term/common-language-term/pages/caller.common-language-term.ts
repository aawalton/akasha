import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const caller = {
  id: "01a0c628-c671-75f7-b40c-c0105319a08b",
  type: "page-type/common-language-term",
  slug: "caller",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "caller" },
    { partOfSpeech: "part-of-speech/noun", spelling: "callers" },
  ],
} as const satisfies CommonLanguageTerm
