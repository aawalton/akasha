import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyApiPageEvents = {
  id: "01a0d586-9231-74e8-ae41-590a9336745d",
  type: "page-type/route",
  slug: "jenny-api-page-events",
  definition: "the one stream of page changes a browser opens",
  code: "ts",
  urlPath: "api/page-events",
} as const satisfies Route
