import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiPageFollow = {
  id: "01a0d583-dc69-7270-b8c4-354dce7ec981",
  type: "page-type/route",
  slug: "atlas-api-page-follow",
  definition: "the pages and lists a browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
} as const satisfies Route
