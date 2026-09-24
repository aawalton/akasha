import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiPageEvents = {
  id: "01a0d579-9033-74ef-af2f-e7402af899b7",
  type: "page-type/route",
  slug: "requests-api-page-events",
  definition: "the one stream of page changes a browser opens",
  code: "ts",
  urlPath: "api/page-events",
} as const satisfies Route
