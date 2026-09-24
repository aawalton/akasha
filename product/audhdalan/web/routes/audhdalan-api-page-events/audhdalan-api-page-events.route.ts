import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const audhdalanApiPageEvents = {
  id: "01a0d5bb-243d-7f88-a54d-daea8556c421",
  type: "page-type/route",
  slug: "audhdalan-api-page-events",
  definition: "the one stream of page changes a browser opens",
  code: "ts",
  urlPath: "api/page-events",
} as const satisfies Route
