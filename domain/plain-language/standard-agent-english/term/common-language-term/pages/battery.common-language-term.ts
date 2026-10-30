import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const battery = {
  id: "01a18d46-c5da-7226-b500-c3753dc124ab",
  type: "page-type/common-language-term",
  slug: "battery",
  definition: "a store of electric energy",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "battery" },
    { partOfSpeech: "part-of-speech/noun", spelling: "batteries" },
  ],
  createdAt: "2026-10-30T14:46:28.057Z",
  updatedAt: "2026-10-30T14:46:28.057Z",
} as const satisfies CommonLanguageTerm
