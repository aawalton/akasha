import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const atlasApiErrors = {
  id: "01a08837-ed8c-7d62-a286-62c731b146d0",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-api-errors",
  definition: "the errors a reader's browser reports",
  code: "ts",
  urlPath: "api/errors",
} as const satisfies Route
