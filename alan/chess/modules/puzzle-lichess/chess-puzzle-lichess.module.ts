import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chessPuzzleLichess = {
  id: "01a0657f-4492-7002-a461-7bfd27ac38a4",
  type: "page-type/module",
  slug: "chess-puzzle-lichess",
  definition: "Lichess's puzzle database read row by row into puzzles",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The puzzle database is read as the download streams rather than held whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is assembled across the reads the row arrives in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which side solves a puzzle is read off the side to move in the puzzle's position.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every puzzle row has the CC0-1.0 licence the database is published under.",
    },
  ],
} as const satisfies Module
