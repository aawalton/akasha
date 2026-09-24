import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyApiPageFollow = {
  id: "01a0d586-9231-7aca-9904-eaa0387dd1a0",
  type: "page-type/route",
  slug: "jenny-api-page-follow",
  definition: "the pages and lists a browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
} as const satisfies Route
