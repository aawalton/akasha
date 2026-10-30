import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiNavIcon = {
  id: "01a0c537-bb8b-78ad-a4d9-069e6c0134bb",
  type: "page-type/route",
  slug: "requests-api-nav-icon",
  definition: "the icon of a nav",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No browser keeps an icon, so a changed nav icon is drawn at once.",
    },
  ],
  createdAt: "2026-09-21T18:25:59.179Z",
  updatedAt: "2026-10-30T16:29:04.887Z",
} as const satisfies Route
