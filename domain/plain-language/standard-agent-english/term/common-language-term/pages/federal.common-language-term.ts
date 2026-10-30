import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const federal = {
  id: "01a18d5f-2d09-7ed8-89b3-8124b5b2b6d1",
  type: "page-type/common-language-term",
  slug: "federal",
  definition: "of the national government of the United States",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "federal" }],
  createdAt: "2026-10-30T15:13:07.336Z",
  updatedAt: "2026-10-30T15:13:07.336Z",
} as const satisfies CommonLanguageTerm
