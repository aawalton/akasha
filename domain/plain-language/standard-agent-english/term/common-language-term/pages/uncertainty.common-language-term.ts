import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const uncertainty = {
  id: "01a18d59-c508-75f1-be98-8a78b9b65287",
  type: "page-type/common-language-term",
  slug: "uncertainty",
  definition: "doubt about what is true, or how much doubt there is",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "uncertainty" },
    { partOfSpeech: "part-of-speech/noun", spelling: "uncertainties" },
  ],
  createdAt: "2026-10-30T15:07:13.030Z",
  updatedAt: "2026-10-30T15:07:13.030Z",
} as const satisfies CommonLanguageTerm
