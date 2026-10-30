import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiChessAnalyze = {
  id: "01a08826-0167-7bf5-88aa-a9afad78bc60",
  type: "page-type/route",
  slug: "alan-web-api-chess-analyze",
  definition: "the score and the move Stockfish finds for a chess position",
  code: "ts",
  urlPath: "api/chess/analyze",
  createdAt: "2026-09-09T21:49:47.239Z",
  updatedAt: "2026-10-30T16:51:16.353Z",
} as const satisfies Route
