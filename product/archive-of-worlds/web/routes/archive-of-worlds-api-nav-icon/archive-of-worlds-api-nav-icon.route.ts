import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsApiNavIcon = {
  id: "01a0828b-efa1-7238-9b14-ce8f2fd1bd81",
  type: "page-type/route",
  slug: "archive-of-worlds-api-nav-icon",
  definition: "the icon drawn for a nav entry",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No browser keeps an icon, so a changed nav icon is drawn at once.",
    },
  ],
  createdAt: "2026-09-08T19:43:24.065Z",
  updatedAt: "2026-09-27T12:18:17.000Z",
} as const satisfies Route
