import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const month = {
  id: "01a1557e-1849-76af-b600-59f1653a2892",
  type: "page-type/common-language-term",
  slug: "month",
  definition: "one of the twelve parts of a year",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "month" },
    { partOfSpeech: "part-of-speech/noun", spelling: "months" },
  ],
  createdAt: "2026-10-19T18:48:09.544Z",
  updatedAt: "2026-10-19T18:48:09.544Z",
} as const satisfies CommonLanguageTerm
