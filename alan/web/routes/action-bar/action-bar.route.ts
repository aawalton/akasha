import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const actionBar = {
  id: "01a0d487-6660-7f6b-a2f8-68de4d735c1d",
  type: "page-type/route",
  slug: "action-bar",
  definition: "what a player sends a game from its action bar, and the action draft it holds",
  code: "ts",
  test: "ts",
  urlPath: "api/action-bar",
  createdAt: "2026-09-24T17:47:18.496Z",
  updatedAt: "2026-10-27T22:10:37.219Z",
} as const satisfies Route
