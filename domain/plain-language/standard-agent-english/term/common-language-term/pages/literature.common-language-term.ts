import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const literature = {
  id: "01a0d89c-2b24-7024-a195-aa14e3ed0e21",
  type: "page-type/common-language-term",
  slug: "literature",
  definition: "writing valued as art",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "literature" }],
  createdAt: "2026-09-25T12:48:28.452Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
