import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiPageTypes = {
  id: "01a0882c-7e31-7f1b-8bfc-3838aa1845d3",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-page-types",
  definition: "the page types a reader's browser asks for",
  code: "ts",
  urlPath: "api/page-types",
} as const satisfies Route
