import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const knowledge = {
  id: "01a18d49-824b-782f-8a95-19f245e102f6",
  type: "page-type/common-language-term",
  slug: "knowledge",
  definition: "what people know",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "knowledge" }],
  createdAt: "2026-10-30T14:49:27.370Z",
  updatedAt: "2026-10-30T14:49:27.370Z",
} as const satisfies CommonLanguageTerm
