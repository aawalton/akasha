import type { Route } from "@akasha/code/route"

export const alanWebApiHealth = {
  id: "01a08823-27d8-700a-9bb4-5d663941d061",
  pageTypeSlug: "route",
  slug: "alan-web-api-health",
  definition: "whether the app answers",
  code: "ts",
  urlPath: "api/health",
} as const satisfies Route
