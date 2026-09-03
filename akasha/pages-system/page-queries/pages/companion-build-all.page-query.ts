import type { PageQuery } from "../page-query.page-type.ts"

export const companionBuildAll = {
  id: "01a063f9-220a-7495-8816-068ed45db720",
  pageTypeSlug: "page-query",
  slug: "companion-build-all",
  asksOfSlug: "companion-build",
  keys: ["slug", "title", "build-hash", "visibility", "correlation-id", "target-count"],
} as const satisfies PageQuery
