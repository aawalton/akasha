import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const audhdalanApiHealth = {
  id: "01a08289-02ac-70b1-b906-ffaca89a7988",
  pageTypeSlug: "route",
  type: "route",
  slug: "audhdalan-api-health",
  definition: "whether the app answers",
  code: "ts",
  urlPath: "api/health",
} as const satisfies Route
