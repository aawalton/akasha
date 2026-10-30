import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chessBoard = {
  id: "01a05bb1-0c04-7928-a1eb-636fd857d174",
  type: "page-type/module",
  slug: "chess-board",
  definition: "a chess position in a browser with pieces Alan moves",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "chess board" },
    { partOfSpeech: "part-of-speech/noun", spelling: "chess boards" },
  ],
  code: "tsx",
  createdAt: "2026-09-01T06:38:44.740Z",
  updatedAt: "2026-10-30T16:25:17.014Z",
} as const satisfies Module
