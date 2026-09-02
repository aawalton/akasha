import type { PageQuery } from "../page-query.page-type.ts"

export const characterBuildAll = {
  id: "01a063f9-2209-7a2f-a8d7-cf3b5b13cd56",
  pageTypeSlug: "page-query",
  slug: "character-build-all",
  asksOfSlug: "character-build",
  keys: ["slug", "build-name", "build-hash", "visibility", "correlation-id"],
} as const satisfies PageQuery
