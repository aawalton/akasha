import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const play = {
  id: "01a0d4d8-4b34-79d7-b084-f2d16e604c84",
  type: "page-type/common-language-term",
  slug: "play",
  definition: "to take part in a game",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "play" },
    { partOfSpeech: "part-of-speech/verb", spelling: "plays" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "played" },
  ],
  createdAt: "2026-09-24T19:15:39.956Z",
  updatedAt: "2026-10-30T15:42:25.586Z",
} as const satisfies CommonLanguageTerm
