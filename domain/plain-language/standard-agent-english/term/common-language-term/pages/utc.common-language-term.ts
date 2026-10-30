import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const utc = {
  id: "01a18d88-94aa-78fe-b7d2-8df5b8d02c7f",
  type: "page-type/common-language-term",
  slug: "utc",
  definition: "the time of day the world's clocks are set from",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "UTC" }],
  createdAt: "2026-10-30T15:58:20.839Z",
  updatedAt: "2026-10-30T15:58:20.839Z",
} as const satisfies CommonLanguageTerm
