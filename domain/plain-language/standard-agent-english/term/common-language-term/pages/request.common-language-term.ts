import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const request = {
  id: "01a0d9d4-5a52-7017-aa6a-688c46a351c2",
  type: "page-type/common-language-term",
  slug: "request",
  definition: "a message that asks a service for an answer",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "request" },
    { partOfSpeech: "part-of-speech/noun", spelling: "requests" },
  ],
} as const satisfies CommonLanguageTerm
