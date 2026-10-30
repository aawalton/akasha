import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const setting = {
  id: "01a18dc1-3af7-79b6-97ff-0d3799a8dff0",
  type: "page-type/common-language-term",
  slug: "setting",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "setting" },
    { partOfSpeech: "part-of-speech/noun", spelling: "settings" },
  ],
  createdAt: "2026-10-30T17:00:13.428Z",
  updatedAt: "2026-10-30T17:00:13.428Z",
} as const satisfies CommonLanguageTerm
