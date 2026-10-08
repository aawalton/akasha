import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiChessAnalyze = {
  id: "01a08826-0167-7bf5-88aa-a9afad78bc60",
  type: "page-type/route",
  slug: "alan-web-api-chess-analyze",
  definition: "the engine's judgement of a chess position",
  code: "ts",
  urlPath: "api/chess/analyze",
  createdAt: "2026-09-09T21:49:47.239Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route
