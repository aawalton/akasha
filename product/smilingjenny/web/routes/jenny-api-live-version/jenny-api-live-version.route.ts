import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyApiLiveVersion = {
  id: "01a08820-a38e-7615-88d8-a0e4c8eff9f0",
  type: "page-type/route",
  slug: "jenny-api-live-version",
  definition: "the running app's build",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
