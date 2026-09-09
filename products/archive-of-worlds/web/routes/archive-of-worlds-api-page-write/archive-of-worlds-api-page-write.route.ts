import type { Route } from "@akasha/code/route"

export const archiveOfWorldsApiPageWrite = {
  id: "01a08282-0e9b-7002-8e5b-cc9367f5dc46",
  pageTypeSlug: "route",
  type: "route",
  slug: "archive-of-worlds-api-page-write",
  definition: "where a reader's edit to a page is taken",
  code: "ts",
  urlPath: "api/page-write",
} as const satisfies Route
