import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasNoSuchPage = {
  id: "01a0e383-ebe0-7b07-99d4-bc6c09a652bd",
  type: "page-type/route",
  slug: "atlas-no-such-page",
  definition: "that no page of Alan's map site is at the address a reader named",
  code: "tsx",
  urlPath: "*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address the map site has no route for is drawn not found by the root.",
    },
  ],
  createdAt: "2026-09-27T15:37:48.768Z",
  updatedAt: "2026-09-27T15:38:05.000Z",
} as const satisfies Route
