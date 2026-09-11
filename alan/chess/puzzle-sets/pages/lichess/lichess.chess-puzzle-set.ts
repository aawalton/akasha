import type { ChessPuzzleSet } from "akasha/alan/chess/puzzle-sets/chess-puzzle-set.page-type.types.ts"

export const lichess = {
  id: "01a06582-bd62-775e-a5b4-28fee8b58455",
  type: "chess-puzzle-set",
  slug: "lichess",
  title: "Lichess",
  puzzles: "jsonl",
} as const satisfies ChessPuzzleSet
