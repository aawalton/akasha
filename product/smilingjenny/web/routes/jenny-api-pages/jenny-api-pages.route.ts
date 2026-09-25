import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyApiPages = {
  id: "01a0d924-d025-75b1-a527-82d32e76f334",
  type: "page-type/route",
  slug: "jenny-api-pages",
  definition: "the pages of the type a reader names",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
} as const satisfies Route
