import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldApiHealth = {
  id: "01a0c5aa-44b6-7832-afe0-86b49703cf39",
  type: "page-type/route",
  slug: "innworld-api-health",
  definition: "whether the app answers",
  code: "ts",
  urlPath: "api/health",
} as const satisfies Route
