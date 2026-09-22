import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiLiveVersion = {
  id: "01a0c537-bb44-703f-94b8-8c7c2623a718",
  type: "page-type/route",
  slug: "requests-api-live-version",
  definition: "the running build's commit",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
