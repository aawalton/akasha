import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const gallon = {
  id: "01a18d7d-a3ec-7841-ad8e-24b884dd81da",
  type: "page-type/common-language-term",
  slug: "gallon",
  definition: "a measure of liquid of about three point eight litres",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "gallon" },
    { partOfSpeech: "part-of-speech/noun", spelling: "gallons" },
  ],
  createdAt: "2026-10-30T15:46:23.850Z",
  updatedAt: "2026-10-30T15:46:23.850Z",
} as const satisfies CommonLanguageTerm
