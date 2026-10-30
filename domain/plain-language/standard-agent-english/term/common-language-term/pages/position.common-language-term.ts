import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const position = {
  id: "01a18d53-d2d3-7227-9401-316369196cab",
  type: "page-type/common-language-term",
  slug: "position",
  definition: "how things are placed, such as the pieces on a board in a game",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "position" },
    { partOfSpeech: "part-of-speech/noun", spelling: "positions" },
  ],
  createdAt: "2026-10-30T15:00:43.344Z",
  updatedAt: "2026-10-30T15:00:43.344Z",
} as const satisfies CommonLanguageTerm
