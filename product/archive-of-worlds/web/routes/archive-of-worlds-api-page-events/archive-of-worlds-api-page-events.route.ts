import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsApiPageEvents = {
  id: "01a0d583-dc69-740b-8781-d8a3856e189a",
  type: "page-type/route",
  slug: "archive-of-worlds-api-page-events",
  definition: "the one stream of page changes a browser opens",
  code: "ts",
  urlPath: "api/page-events",
} as const satisfies Route
