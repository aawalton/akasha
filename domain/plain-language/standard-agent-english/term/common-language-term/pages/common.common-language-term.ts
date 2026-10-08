import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const common = {
  id: "01a0d90d-7ecb-7990-bde1-1204795b68d5",
  type: "page-type/common-language-term",
  slug: "common",
  definition: "shared by many",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "common" }],
  createdAt: "2026-09-25T14:52:15.435Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
