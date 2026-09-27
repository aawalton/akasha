import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiNavIcon = {
  id: "01a0829c-2416-7e2d-a9f1-7c33b625459e",
  type: "page-type/route",
  slug: "alan-web-api-nav-icon",
  definition: "the icon drawn for a nav entry",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No browser keeps an icon, so a changed nav icon is drawn at once.",
    },
  ],
} as const satisfies Route
