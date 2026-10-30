import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const signOut = {
  id: "01a18d40-38ef-70d6-9e83-b88124160e6b",
  type: "page-type/common-language-term",
  slug: "sign-out",
  definition: "to end a sign-in to a program",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "sign out" },
    { partOfSpeech: "part-of-speech/verb", spelling: "signs out" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "signed out" },
  ],
  createdAt: "2026-10-30T14:39:18.767Z",
  updatedAt: "2026-10-30T14:39:18.767Z",
} as const satisfies CommonLanguageTerm
