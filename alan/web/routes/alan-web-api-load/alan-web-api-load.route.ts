import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiLoad = {
  id: "01a0882e-a251-792e-b4ee-6c207bfecf3c",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-load",
  definition: "the idle save a signed-in reader last kept",
  code: "ts",
  urlPath: "api/load",
} as const satisfies Route
