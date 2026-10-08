import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const medical = {
  id: "01a0d89d-c486-765f-a747-3484622499fd",
  type: "page-type/common-language-term",
  slug: "medical",
  definition: "about treating illness",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "medical" }],
  createdAt: "2026-09-25T12:50:13.254Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
