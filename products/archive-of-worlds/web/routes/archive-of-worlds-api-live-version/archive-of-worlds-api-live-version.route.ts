import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const archiveOfWorldsApiLiveVersion = {
  id: "01a0827f-44b1-7a37-b7ee-58cbc89e92bd",
  pageTypeSlug: "route",
  type: "route",
  slug: "archive-of-worlds-api-live-version",
  definition: "the build the running app was made from",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
