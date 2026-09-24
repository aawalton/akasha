import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const actionBar = {
  id: "01a0d487-6660-7f6b-a2f8-68de4d735c1d",
  type: "page-type/route",
  slug: "action-bar",
  definition: "an action a player sends a game from its action bar, and the actions still waiting",
  code: "ts",
  test: "ts",
  urlPath: "api/action-bar",
} as const satisfies Route
