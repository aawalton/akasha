import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const cable = {
  id: "01a18d50-8fa3-7721-be92-44237c27113a",
  type: "page-type/common-language-term",
  slug: "cable",
  definition: "a covered wire that joins two devices",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "cable" },
    { partOfSpeech: "part-of-speech/noun", spelling: "cables" },
  ],
  createdAt: "2026-10-30T14:57:09.537Z",
  updatedAt: "2026-10-30T14:57:09.537Z",
} as const satisfies CommonLanguageTerm
