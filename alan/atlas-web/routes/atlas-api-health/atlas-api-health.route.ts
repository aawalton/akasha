import type { Route } from "@akasha/code/route"

export const atlasApiHealth = {
  id: "01a08837-528b-712b-b76c-93c825c23fc6",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-api-health",
  definition: "whether the app answers",
  code: "ts",
  urlPath: "api/health",
} as const satisfies Route
