import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldApiPageEvents = {
  id: "01a0d583-dc69-7156-9dc7-30543797cb9e",
  type: "page-type/route",
  slug: "innworld-api-page-events",
  definition: "the one stream of page changes a browser opens",
  code: "ts",
  urlPath: "api/page-events",
} as const satisfies Route
