import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const not = {
  id: "01a0d987-dcb2-70c2-936f-a25ea1a1b392",
  type: "page-type/common-language-term",
  slug: "not",
  definition: "the opposite of what follows",
  spellings: [{ partOfSpeech: "part-of-speech/negator", spelling: "not" }],
  createdAt: "2026-09-25T17:05:54.866Z",
  updatedAt: "2026-09-25T17:05:59.000Z",
} as const satisfies CommonLanguageTerm
