import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const icloud = {
  id: "01a18d84-aed9-7eee-a286-a103791734e0",
  type: "page-type/common-language-term",
  slug: "icloud",
  definition: "the service that keeps the files of an Apple account",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "iCloud" }],
  createdAt: "2026-10-30T15:54:05.400Z",
  updatedAt: "2026-10-30T15:54:05.400Z",
} as const satisfies CommonLanguageTerm
