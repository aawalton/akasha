import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const driver = {
  id: "01a18d4a-ab76-7efc-91b0-755c8eaa682d",
  type: "page-type/common-language-term",
  slug: "driver",
  definition: "a person who drives a car",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "driver" },
    { partOfSpeech: "part-of-speech/noun", spelling: "drivers" },
  ],
  createdAt: "2026-10-30T14:50:43.445Z",
  updatedAt: "2026-10-30T14:50:43.445Z",
} as const satisfies CommonLanguageTerm
