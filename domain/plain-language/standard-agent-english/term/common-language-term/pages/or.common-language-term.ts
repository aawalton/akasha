import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const or = {
  id: "01a0c60f-79a7-7787-b681-102de84710a3",
  type: "page-type/common-language-term",
  slug: "or",
  definition: "the conjunction joining two things as a choice between them",
  spellings: [{ partOfSpeech: "part-of-speech/conjunction", spelling: "or" }],
} as const satisfies CommonLanguageTerm
