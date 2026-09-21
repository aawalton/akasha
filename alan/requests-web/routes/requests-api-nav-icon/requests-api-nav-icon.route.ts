import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiNavIcon = {
  id: "01a0c537-bb8b-78ad-a4d9-069e6c0134bb",
  type: "page-type/route",
  slug: "requests-api-nav-icon",
  definition: "the icon drawn for a nav entry",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
} as const satisfies Route
