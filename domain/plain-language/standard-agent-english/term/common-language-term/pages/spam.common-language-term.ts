import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const spam = {
  id: "01a18d73-b1a4-7cb4-87ee-cbe821036e2c",
  type: "page-type/common-language-term",
  slug: "spam",
  definition: "the email a service keeps from the inbox",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "spam" }],
  createdAt: "2026-10-30T15:35:32.003Z",
  updatedAt: "2026-10-30T15:35:32.003Z",
} as const satisfies CommonLanguageTerm
