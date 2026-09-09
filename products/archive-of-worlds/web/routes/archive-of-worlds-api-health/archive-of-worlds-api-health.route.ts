import type { Route } from "@akasha/code/route"

export const archiveOfWorldsApiHealth = {
  id: "01a0827f-258b-77c8-a876-e856c2cf6951",
  pageTypeSlug: "route",
  slug: "archive-of-worlds-api-health",
  definition: "whether the app answers",
  code: "ts",
  urlPath: "api/health",
} as const satisfies Route
