import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPageTypes = {
  id: "01a0882c-7e31-7f1b-8bfc-3838aa1845d3",
  type: "page-type/route",
  slug: "alan-web-api-page-types",
  definition: "the page types served to a reader's browser",
  code: "ts",
  urlPath: "api/page-types",
} as const satisfies Route
