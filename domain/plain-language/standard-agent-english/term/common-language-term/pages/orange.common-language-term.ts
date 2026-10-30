import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const orange = {
  id: "01a18d8b-4f5b-79a6-a7c8-e0d7caf4922e",
  type: "page-type/common-language-term",
  slug: "orange",
  definition: "of the color between red and yellow",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "orange" }],
  createdAt: "2026-10-30T16:01:19.701Z",
  updatedAt: "2026-10-30T16:01:19.701Z",
} as const satisfies CommonLanguageTerm
