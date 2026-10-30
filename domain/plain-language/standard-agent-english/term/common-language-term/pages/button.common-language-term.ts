import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const button = {
  id: "01a18d6a-0f40-7aa3-b420-bd863d0c1199",
  type: "page-type/common-language-term",
  slug: "button",
  definition: "a part of a screen a person uses",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "button" },
    { partOfSpeech: "part-of-speech/noun", spelling: "buttons" },
  ],
  createdAt: "2026-10-30T15:25:00.607Z",
  updatedAt: "2026-10-30T15:25:00.607Z",
} as const satisfies CommonLanguageTerm
