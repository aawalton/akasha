import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiLiveVersion = {
  id: "01a08837-9534-724a-bd7e-fd1e5fe6f6c7",
  type: "page-type/route",
  slug: "atlas-api-live-version",
  definition: "the running build's commit",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
