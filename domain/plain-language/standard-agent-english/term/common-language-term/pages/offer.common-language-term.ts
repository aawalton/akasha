import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const offer = {
  id: "01a18d5a-c254-7ba3-8af3-ac96edd80c3c",
  type: "page-type/common-language-term",
  slug: "offer",
  definition: "something a store gives a buyer for a lower price",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "offer" },
    { partOfSpeech: "part-of-speech/noun", spelling: "offers" },
  ],
  createdAt: "2026-10-30T15:08:17.875Z",
  updatedAt: "2026-10-30T15:08:17.875Z",
} as const satisfies CommonLanguageTerm
