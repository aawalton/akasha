import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiLiveVersion = {
  id: "01a08823-da1b-7e45-bdc0-2a3d18602127",
  type: "page-type/route",
  slug: "alan-web-api-live-version",
  definition: "the running build's commit",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
