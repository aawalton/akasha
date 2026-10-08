import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsNoSuchPage = {
  id: "01a0e383-ebe0-75e3-af58-a0c66b54d03e",
  type: "page-type/route",
  slug: "archive-of-worlds-no-such-page",
  definition: "that no page of archiveofworlds.app is at the address a reader named",
  code: "tsx",
  urlPath: "*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address the archive has no route for is drawn not found by the root.",
    },
  ],
  createdAt: "2026-09-27T15:37:48.768Z",
  updatedAt: "2026-09-27T15:38:05.000Z",
} as const satisfies Route
