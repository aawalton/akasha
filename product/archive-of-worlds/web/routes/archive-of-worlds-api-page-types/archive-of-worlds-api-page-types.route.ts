import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsApiPageTypes = {
  id: "01a0827f-6769-7ea7-9e32-23e1a3464f49",
  type: "page-type/route",
  slug: "archive-of-worlds-api-page-types",
  definition: "the page types served to a reader",
  code: "ts",
  urlPath: "api/page-types",
} as const satisfies Route
