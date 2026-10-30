import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const report = {
  id: "01a18d8d-69f4-79ef-b487-63b6ca755dc5",
  type: "page-type/common-language-term",
  slug: "report",
  definition: "to tell what was found or measured",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "report" },
    { partOfSpeech: "part-of-speech/verb", spelling: "reports" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "reported" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "reporting" },
  ],
  createdAt: "2026-10-30T16:03:37.587Z",
  updatedAt: "2026-10-30T16:03:37.587Z",
} as const satisfies CommonLanguageTerm
