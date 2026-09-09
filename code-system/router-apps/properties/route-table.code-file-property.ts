import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type RouteTable = "ts"

export const routeTable = {
  id: "01a063f3-c2af-7450-b13c-1abafd59e61a",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "route-table",
  propertySlug: "route-table",
  definition: "what names every route a package serves",
  fileName: "routes.ts",
} as const satisfies CodeFileProperty
