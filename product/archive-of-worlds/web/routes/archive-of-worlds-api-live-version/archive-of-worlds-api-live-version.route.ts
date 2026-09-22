import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsApiLiveVersion = {
  id: "01a0827f-44b1-7a37-b7ee-58cbc89e92bd",
  type: "page-type/route",
  slug: "archive-of-worlds-api-live-version",
  definition: "the running app's build",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
