import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiNavIcon = {
  id: "01a0c537-bb8b-78ad-a4d9-069e6c0134bb",
  type: "page-type/route",
  slug: "requests-api-nav-icon",
  definition: "the icon drawn for a nav entry",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No browser keeps an icon, so a changed nav icon is drawn at once.",
    },
  ],
  createdAt: "2026-09-21T18:25:59.179Z",
  updatedAt: "2026-09-27T12:17:41.000Z",
} as const satisfies Route
