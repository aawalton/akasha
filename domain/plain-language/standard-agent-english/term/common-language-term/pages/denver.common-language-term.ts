import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const denver = {
  id: "01a18d7a-dea9-7f9b-b139-ce30f2be1560",
  type: "page-type/common-language-term",
  slug: "denver",
  definition: "the capital city of Colorado",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Denver" }],
  createdAt: "2026-10-30T15:43:22.280Z",
  updatedAt: "2026-10-30T15:43:22.280Z",
} as const satisfies CommonLanguageTerm
