import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPageFollow = {
  id: "01a0d4bf-e376-77a8-a8cb-1f6754f8cda0",
  type: "page-type/route",
  slug: "alan-web-api-page-follow",
  definition: "the pages and lists a browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
} as const satisfies Route
