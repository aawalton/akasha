import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const audhdalanSafetyLevels = {
  id: "01a08288-b9bb-78c4-b28a-37e2f8652e82",
  type: "page-type/route",
  slug: "audhdalan-safety-levels",
  definition: "the scale against which Alan reads his own capacity",
  code: "tsx",
  urlPath: "safety-levels",
} as const satisfies Route
