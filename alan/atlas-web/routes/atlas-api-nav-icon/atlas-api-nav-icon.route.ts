import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const atlasApiNavIcon = {
  id: "01a08299-534b-79fc-b0e6-8d4012f48d31",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-api-nav-icon",
  definition: "the icon drawn for a nav entry",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
} as const satisfies Route
