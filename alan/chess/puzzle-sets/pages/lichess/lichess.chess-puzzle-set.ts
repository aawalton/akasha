import type { ChessPuzzleSet } from "../../chess-puzzle-set.page-type.ts"

export const lichess = {
  id: "01a06582-bd62-775e-a5b4-28fee8b58455",
  pageTypeSlug: "chess-puzzle-set",
  slug: "lichess",
  title: "Lichess",
  puzzles: "jsonl",
} as const satisfies ChessPuzzleSet
