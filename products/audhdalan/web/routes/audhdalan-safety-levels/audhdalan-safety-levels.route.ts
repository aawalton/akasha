import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const audhdalanSafetyLevels = {
  id: "01a08288-b9bb-78c4-b28a-37e2f8652e82",
  pageTypeSlug: "route",
  type: "route",
  slug: "audhdalan-safety-levels",
  definition: "the scale Alan reads his own capacity against",
  code: "tsx",
  urlPath: "safety-levels",
} as const satisfies Route
