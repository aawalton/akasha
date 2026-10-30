import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const estimate = {
  id: "01a18d56-e4f4-73ba-af20-609c35c0516f",
  type: "page-type/common-language-term",
  slug: "estimate",
  definition: "a rough figure judged rather than measured",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "estimate" },
    { partOfSpeech: "part-of-speech/noun", spelling: "estimates" },
  ],
  createdAt: "2026-10-30T15:04:04.595Z",
  updatedAt: "2026-10-30T15:04:04.595Z",
} as const satisfies CommonLanguageTerm
