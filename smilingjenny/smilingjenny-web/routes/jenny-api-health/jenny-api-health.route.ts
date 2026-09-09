import type { Route } from "@akasha/code/route"

export const jennyApiHealth = {
  id: "01a0881f-fc1d-71d5-b16c-e68474c6a2d4",
  pageTypeSlug: "route",
  slug: "jenny-api-health",
  definition: "whether the app answers",
  code: "ts",
  urlPath: "api/health",
} as const satisfies Route
