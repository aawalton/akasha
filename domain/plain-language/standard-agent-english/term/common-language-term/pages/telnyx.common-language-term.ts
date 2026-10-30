import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const telnyx = {
  id: "01a18d90-b188-7407-871a-39d19f2ec9ca",
  type: "page-type/common-language-term",
  slug: "telnyx",
  definition: "a company that carries text messages for akasha",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Telnyx" }],
  createdAt: "2026-10-30T16:07:12.519Z",
  updatedAt: "2026-10-30T16:07:12.519Z",
} as const satisfies CommonLanguageTerm
