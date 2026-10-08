import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldNoSuchPage = {
  id: "01a0e383-ebe0-7a80-acef-960ffabf82c4",
  type: "page-type/route",
  slug: "innworld-no-such-page",
  definition: "that no page of innworld.wiki is at the address a reader named",
  code: "tsx",
  urlPath: "*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address none of the wiki's routes answers is drawn not found by the root.",
    },
  ],
  createdAt: "2026-09-27T15:37:48.768Z",
  updatedAt: "2026-09-27T15:38:05.000Z",
} as const satisfies Route
