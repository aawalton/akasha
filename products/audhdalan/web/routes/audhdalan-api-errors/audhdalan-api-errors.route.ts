import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const audhdalanApiErrors = {
  id: "01a08289-249b-7758-9a5b-18363c1d249c",
  pageTypeSlug: "route",
  type: "route",
  slug: "audhdalan-api-errors",
  definition: "the errors a reader's browser reports",
  code: "ts",
  urlPath: "api/errors",
} as const satisfies Route
