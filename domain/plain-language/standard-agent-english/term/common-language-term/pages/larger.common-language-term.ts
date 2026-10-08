import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const larger = {
  id: "01a0d973-7127-78fd-9204-3fb972991cd2",
  type: "page-type/common-language-term",
  slug: "larger",
  definition: "bigger than before",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "larger" }],
  createdAt: "2026-09-25T16:43:36.615Z",
  updatedAt: "2026-09-25T16:43:42.000Z",
} as const satisfies CommonLanguageTerm
