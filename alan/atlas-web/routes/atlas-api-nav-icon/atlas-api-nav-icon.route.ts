import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiNavIcon = {
  id: "01a08299-534b-79fc-b0e6-8d4012f48d31",
  type: "page-type/route",
  slug: "atlas-api-nav-icon",
  definition: "the image of a nav",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No browser keeps an icon, so a changed nav icon is drawn at once.",
    },
  ],
  createdAt: "2026-09-08T19:58:01.547Z",
  updatedAt: "2026-10-30T14:42:44.067Z",
} as const satisfies Route
