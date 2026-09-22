import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiPageTypes = {
  id: "01a0c537-bb61-7f3f-998f-aea61225006b",
  type: "page-type/route",
  slug: "requests-api-page-types",
  definition: "the page types answered to a reader's browser",
  code: "ts",
  urlPath: "api/page-types",
} as const satisfies Route
