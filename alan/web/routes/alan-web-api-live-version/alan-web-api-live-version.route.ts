import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiLiveVersion = {
  id: "01a08823-da1b-7e45-bdc0-2a3d18602127",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-live-version",
  definition: "the commit the running build came from",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
