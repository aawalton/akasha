import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const refund = {
  id: "01a18d7a-4faa-75b2-b5c4-8ad46ebd2cd7",
  type: "page-type/common-language-term",
  slug: "refund",
  definition: "money a seller gives back for a thing bought",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "refund" },
    { partOfSpeech: "part-of-speech/noun", spelling: "refunds" },
  ],
  createdAt: "2026-10-30T15:42:45.672Z",
  updatedAt: "2026-10-30T15:42:45.672Z",
} as const satisfies CommonLanguageTerm
