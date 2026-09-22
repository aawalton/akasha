import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiPages = {
  id: "01a0c537-bb6f-70ef-a83a-6d6b6173ce03",
  type: "page-type/route",
  slug: "requests-api-pages",
  definition: "the pages of a type answered to a browser",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
} as const satisfies Route
