import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const pgn = {
  id: "01a18d6d-aad8-7d42-bfd3-919990d2cbd9",
  type: "page-type/common-language-term",
  slug: "pgn",
  definition: "the text a chess program writes for a chess game",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "PGN" }],
  createdAt: "2026-10-30T15:28:57.046Z",
  updatedAt: "2026-10-30T15:28:57.046Z",
} as const satisfies CommonLanguageTerm
