import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsApiPages = {
  id: "01a0828b-c92b-7035-9191-3e58399e6580",
  type: "page-type/route",
  slug: "archive-of-worlds-api-pages",
  definition: "the pages of the type a reader names",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
  createdAt: "2026-09-08T19:43:14.219Z",
  updatedAt: "2026-09-22T14:08:59.000Z",
} as const satisfies Route
