import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const today = {
  id: "01a0d88d-71d0-7ec9-9dcd-defffc319dd5",
  type: "page-type/common-language-term",
  slug: "today",
  definition: "the current day",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "today" }],
  createdAt: "2026-09-25T12:32:23.504Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
