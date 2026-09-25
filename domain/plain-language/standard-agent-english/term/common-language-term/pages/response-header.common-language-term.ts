import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const responseHeader = {
  id: "01a0d9d7-f9cd-7ebe-b0a9-2a13eb4c0331",
  type: "page-type/common-language-term",
  slug: "response-header",
  definition: "a named value sent at the top of a response",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "response header" },
    { partOfSpeech: "part-of-speech/noun", spelling: "response headers" },
  ],
} as const satisfies CommonLanguageTerm
