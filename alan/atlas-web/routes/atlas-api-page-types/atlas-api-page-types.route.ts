import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiPageTypes = {
  id: "01a08838-8174-746b-8346-4172e45c6e4f",
  type: "page-type/route",
  slug: "atlas-api-page-types",
  definition: "the page types a reader's browser requests",
  code: "ts",
  urlPath: "api/page-types",
} as const satisfies Route
