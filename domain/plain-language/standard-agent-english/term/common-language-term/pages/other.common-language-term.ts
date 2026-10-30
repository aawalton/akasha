import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const other = {
  id: "01a18d78-f3fa-7947-9040-3aa406d30cfb",
  type: "page-type/common-language-term",
  slug: "other",
  definition: "not the one already named",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "other" }],
  createdAt: "2026-10-30T15:41:16.665Z",
  updatedAt: "2026-10-30T15:41:16.665Z",
} as const satisfies CommonLanguageTerm
