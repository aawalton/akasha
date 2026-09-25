import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyApiPageTypes = {
  id: "01a0d924-d025-7d43-88c8-0a6eb6ff4f7f",
  type: "page-type/route",
  slug: "jenny-api-page-types",
  definition: "the page types served to a reader",
  code: "ts",
  urlPath: "api/page-types",
} as const satisfies Route
