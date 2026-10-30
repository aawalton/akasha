import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const registration = {
  id: "01a18d64-151f-77b6-a2f1-54c7390805f6",
  type: "page-type/common-language-term",
  slug: "registration",
  definition: "the entry of a thing on an official list",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "registration" }],
  createdAt: "2026-10-30T15:18:28.894Z",
  updatedAt: "2026-10-30T15:18:28.894Z",
} as const satisfies CommonLanguageTerm
