import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiPageEvents = {
  id: "01a0d583-dc69-7b7a-8a8c-8cf3d1ce277e",
  type: "page-type/route",
  slug: "atlas-api-page-events",
  definition: "the one stream of page changes a browser opens",
  code: "ts",
  urlPath: "api/page-events",
} as const satisfies Route
