import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const before = {
  id: "01a0d921-6a6c-7fa9-bc79-dff458968322",
  type: "page-type/common-language-term",
  slug: "before",
  definition: "earlier than",
  spellings: [
    { partOfSpeech: "part-of-speech/preposition", spelling: "before" },
    { partOfSpeech: "part-of-speech/time-conjunction", spelling: "before" },
  ],
  createdAt: "2026-09-25T15:14:00.940Z",
  updatedAt: "2026-10-19T17:46:50.583Z",
} as const satisfies CommonLanguageTerm
