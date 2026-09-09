import type { Route } from "@akasha/code/route"

export const archiveOfWorldsApiPages = {
  id: "01a0828b-c92b-7035-9191-3e58399e6580",
  pageTypeSlug: "route",
  type: "route",
  slug: "archive-of-worlds-api-pages",
  definition: "the pages of one type a reader asks for",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
} as const satisfies Route
