import type { PageQuery } from "../page-query.page-type.ts"

export const chessGamesPlayed = {
  id: "01a063f9-2209-7845-9d85-80a55b71674f",
  pageTypeSlug: "page-query",
  slug: "chess-games-played",
  asksOfSlug: "chess-game",
  narrows: [{ key: "source", comparison: "not-in", values: ["master-games"] }],
} as const satisfies PageQuery
