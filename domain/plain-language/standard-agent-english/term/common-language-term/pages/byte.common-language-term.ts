import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const byte = {
  id: "01a18d4d-a130-759f-9595-0b89c55fecc5",
  type: "page-type/common-language-term",
  slug: "byte",
  definition: "eight bits of stored data",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "byte" },
    { partOfSpeech: "part-of-speech/noun", spelling: "bytes" },
  ],
  createdAt: "2026-10-30T14:53:57.423Z",
  updatedAt: "2026-10-30T14:53:57.423Z",
} as const satisfies CommonLanguageTerm
