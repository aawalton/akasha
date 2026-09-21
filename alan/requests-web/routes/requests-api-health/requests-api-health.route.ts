import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiHealth = {
  id: "01a0c537-bb34-7757-96e7-19e78bcd12a3",
  type: "page-type/route",
  slug: "requests-api-health",
  definition: "whether the app answers",
  code: "ts",
  urlPath: "api/health",
} as const satisfies Route
