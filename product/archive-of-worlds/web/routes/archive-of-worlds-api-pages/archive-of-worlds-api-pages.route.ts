import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsApiPages = {
  id: "01a0828b-c92b-7035-9191-3e58399e6580",
  type: "page-type/route",
  slug: "archive-of-worlds-api-pages",
  definition: "the pages of the type a reader names",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
} as const satisfies Route
