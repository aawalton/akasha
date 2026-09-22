import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsPageDetail = {
  id: "01a0c537-bad8-7ed3-8fbf-0f2b74a75fce",
  type: "page-type/route",
  slug: "requests-page-detail",
  definition: "a page, drawn with its properties",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav page is drawn as the page that nav item points at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type reaching no page is looked for again among that type's descendants.",
    },
  ],
} as const satisfies Route
