import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const message = {
  id: "01a0d5be-ea49-74c9-9768-cd066dde5162",
  type: "page-type/common-language-term",
  slug: "message",
  definition: "words sent from one person or program to another",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "message" },
    { partOfSpeech: "part-of-speech/noun", spelling: "messages" },
  ],
  createdAt: "2026-09-24T23:27:33.961Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
