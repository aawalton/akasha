import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const spreadsheet = {
  id: "01a18d58-8df1-7bd5-9e17-b67e248ec88f",
  type: "page-type/common-language-term",
  slug: "spreadsheet",
  definition: "a file that holds rows of numbers and text",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "spreadsheet" },
    { partOfSpeech: "part-of-speech/noun", spelling: "spreadsheets" },
  ],
  createdAt: "2026-10-30T15:05:53.392Z",
  updatedAt: "2026-10-30T15:05:53.392Z",
} as const satisfies CommonLanguageTerm
