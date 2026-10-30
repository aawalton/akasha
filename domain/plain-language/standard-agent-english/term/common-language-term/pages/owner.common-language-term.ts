import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const owner = {
  id: "01a18d4e-6f2c-7c79-9d8c-00bd40de77b5",
  type: "page-type/common-language-term",
  slug: "owner",
  definition: "a person a thing belongs to",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "owner" },
    { partOfSpeech: "part-of-speech/noun", spelling: "owners" },
  ],
  createdAt: "2026-10-30T14:54:50.155Z",
  updatedAt: "2026-10-30T14:54:50.155Z",
} as const satisfies CommonLanguageTerm
