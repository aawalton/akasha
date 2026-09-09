import type { Route } from "@akasha/code/route"

export const atlasApiLiveVersion = {
  id: "01a08837-9534-724a-bd7e-fd1e5fe6f6c7",
  pageTypeSlug: "route",
  slug: "atlas-api-live-version",
  definition: "the commit the running build came from",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
