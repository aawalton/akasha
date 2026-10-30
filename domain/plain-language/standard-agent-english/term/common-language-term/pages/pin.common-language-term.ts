import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const pin = {
  id: "01a18d8b-eec2-71a5-9559-be8ae2970f1a",
  type: "page-type/common-language-term",
  slug: "pin",
  definition: "a mark that shows a place on a map",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "pin" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pins" },
  ],
  createdAt: "2026-10-30T16:02:00.513Z",
  updatedAt: "2026-10-30T16:02:00.513Z",
} as const satisfies CommonLanguageTerm
