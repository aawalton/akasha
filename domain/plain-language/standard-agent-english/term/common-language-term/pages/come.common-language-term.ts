import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const come = {
  id: "01a18d5a-2bde-714b-967e-35434f3db1b5",
  type: "page-type/common-language-term",
  slug: "come",
  definition: "to move or reach toward a place",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "come" },
    { partOfSpeech: "part-of-speech/verb", spelling: "comes" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "coming" },
  ],
  createdAt: "2026-10-30T15:07:39.356Z",
  updatedAt: "2026-10-30T15:07:39.356Z",
} as const satisfies CommonLanguageTerm
