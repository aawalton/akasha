import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const icd10 = {
  id: "01a18d94-9e9c-7f36-92f9-2697d349713f",
  type: "page-type/common-language-term",
  slug: "icd-10",
  definition: "the published list of codes that diseases and deaths are counted under",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "ICD-10" }],
  createdAt: "2026-10-30T16:11:29.818Z",
  updatedAt: "2026-10-30T16:11:29.818Z",
} as const satisfies CommonLanguageTerm
