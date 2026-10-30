import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const python = {
  id: "01a18d85-3d8b-7550-9c9f-2e2aaf5d34c3",
  type: "page-type/common-language-term",
  slug: "python",
  definition: "a language for code that the Python interpreter runs",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Python" }],
  createdAt: "2026-10-30T15:54:41.928Z",
  updatedAt: "2026-10-30T15:54:41.928Z",
} as const satisfies CommonLanguageTerm
