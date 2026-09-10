import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiChessAnalyze = {
  id: "01a08826-0167-7bf5-88aa-a9afad78bc60",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-chess-analyze",
  definition: "the engine's judgement of a chess position",
  code: "ts",
  urlPath: "api/chess/analyze",
} as const satisfies Route
