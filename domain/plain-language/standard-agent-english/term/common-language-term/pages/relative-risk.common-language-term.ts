import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const relativeRisk = {
  id: "01a18d95-bcc6-7c90-8b3a-9a6ecee7ad08",
  type: "page-type/common-language-term",
  slug: "relative-risk",
  definition:
    "the deaths among people with a risk factor for each death among people without that risk factor",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "relative risk" },
    { partOfSpeech: "part-of-speech/noun", spelling: "relative risks" },
  ],
  createdAt: "2026-10-30T16:12:43.077Z",
  updatedAt: "2026-10-30T16:12:43.077Z",
} as const satisfies CommonLanguageTerm
