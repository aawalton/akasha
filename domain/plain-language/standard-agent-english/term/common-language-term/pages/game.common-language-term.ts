import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const game = {
  id: "01a0d4ed-d01a-7f62-9103-80f3cee65429",
  type: "page-type/common-language-term",
  slug: "game",
  definition: "something people play by rules",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "game" },
    { partOfSpeech: "part-of-speech/noun", spelling: "games" },
  ],
  createdAt: "2026-09-24T19:39:10.234Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
