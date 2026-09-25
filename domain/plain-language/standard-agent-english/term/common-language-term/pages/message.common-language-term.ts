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
} as const satisfies CommonLanguageTerm
