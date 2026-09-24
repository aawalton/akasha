import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiPageFollow = {
  id: "01a0d579-9034-72cb-8e17-60a6490893d2",
  type: "page-type/route",
  slug: "requests-api-page-follow",
  definition: "the pages and lists a browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
} as const satisfies Route
