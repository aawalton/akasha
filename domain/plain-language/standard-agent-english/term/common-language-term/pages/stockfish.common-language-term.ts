import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const stockfish = {
  id: "01a18db7-9025-7a7d-a43a-0bb13d5022fe",
  type: "page-type/common-language-term",
  slug: "stockfish",
  definition: "a program that plays chess",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Stockfish" }],
  createdAt: "2026-10-30T16:49:39.876Z",
  updatedAt: "2026-10-30T16:49:39.876Z",
} as const satisfies CommonLanguageTerm
