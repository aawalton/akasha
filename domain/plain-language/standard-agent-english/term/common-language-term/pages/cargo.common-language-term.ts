import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const cargo = {
  id: "01a18d4c-4ebc-70e2-ba74-f0f1c2adfd6f",
  type: "page-type/common-language-term",
  slug: "cargo",
  definition: "the goods a vehicle carries",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "cargo" }],
  createdAt: "2026-10-30T14:52:30.779Z",
  updatedAt: "2026-10-30T14:52:30.779Z",
} as const satisfies CommonLanguageTerm
