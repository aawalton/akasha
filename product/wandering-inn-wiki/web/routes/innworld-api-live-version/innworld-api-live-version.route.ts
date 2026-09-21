import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldApiLiveVersion = {
  id: "01a0c629-828c-778e-b93d-cc43411cc5eb",
  type: "page-type/route",
  slug: "innworld-api-live-version",
  definition: "the commit the running build came from",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
