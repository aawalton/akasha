import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const token = {
  id: "01a155bb-b816-751b-801d-93d288ef8271",
  type: "page-type/common-language-term",
  slug: "token",
  definition: "a small part of the text a model reads or writes",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "token" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tokens" },
  ],
  createdAt: "2026-10-19T19:55:28.149Z",
  updatedAt: "2026-10-19T19:55:28.149Z",
} as const satisfies CommonLanguageTerm
