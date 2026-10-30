import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const signInSession = {
  id: "01a18d8e-5dc3-72c3-adb4-4783abd5ff55",
  type: "page-type/common-language-term",
  slug: "sign-in-session",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "sign-in session" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sign-in sessions" },
  ],
  createdAt: "2026-10-30T16:04:40.002Z",
  updatedAt: "2026-10-30T16:04:40.002Z",
} as const satisfies CommonLanguageTerm
