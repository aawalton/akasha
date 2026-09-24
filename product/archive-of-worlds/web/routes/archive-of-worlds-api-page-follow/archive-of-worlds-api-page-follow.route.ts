import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsApiPageFollow = {
  id: "01a0d583-dc69-7861-871a-b8d100073183",
  type: "page-type/route",
  slug: "archive-of-worlds-api-page-follow",
  definition: "the pages and lists a browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
} as const satisfies Route
