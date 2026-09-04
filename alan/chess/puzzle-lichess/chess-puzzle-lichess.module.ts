import type { Module } from "@akasha/code-system/module"

export const chessPuzzleLichess = {
  id: "01a0657f-4492-7002-a461-7bfd27ac38a4",
  pageTypeSlug: "module",
  slug: "chess-puzzle-lichess",
  definition: "Lichess's puzzle database read row by row into puzzles",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The puzzle database is read as the download streams rather than held whole.",
    },
    {
      invariantKind: "departure",
      statement: "A row is assembled across the reads the row arrives in.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which side solves a puzzle is read off the side to move in the puzzle's position.",
    },
    {
      invariantKind: "departure",
      statement: "Every puzzle row carries the CC0-1.0 licence the database is published under.",
    },
  ],
} as const satisfies Module
