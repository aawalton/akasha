import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const workout = {
  id: "01a18db6-af7b-7fac-a472-9c02dc692796",
  type: "page-type/common-language-term",
  slug: "workout",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "workout" },
    { partOfSpeech: "part-of-speech/noun", spelling: "workouts" },
  ],
  createdAt: "2026-10-30T16:48:42.362Z",
  updatedAt: "2026-10-30T16:48:42.362Z",
} as const satisfies CommonLanguageTerm
