import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const or = {
  id: "01a0c60f-79a7-7787-b681-102de84710a3",
  type: "page-type/common-language-term",
  slug: "or",
  definition: "the conjunction joining two things as a choice between them",
  spellings: [{ partOfSpeech: "part-of-speech/conjunction", spelling: "or" }],
  createdAt: "2026-09-21T22:21:38.087Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
