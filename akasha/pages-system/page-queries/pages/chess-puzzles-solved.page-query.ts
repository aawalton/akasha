import type { PageQuery } from "../page-query.page-type.ts"

export const chessPuzzlesSolved = {
  id: "01a063f9-220a-7f67-9ab3-0f1bfce39c49",
  pageTypeSlug: "page-query",
  slug: "chess-puzzles-solved",
  asksOfSlug: "chess-puzzle",
  narrows: [{ key: "solved", comparison: "is", values: ["true"] }],
} as const satisfies PageQuery
