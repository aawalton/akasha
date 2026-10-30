import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasPageDetail = {
  id: "01a0883d-a94b-761e-a164-2900c651ecf8",
  type: "page-type/route",
  slug: "atlas-page-detail",
  definition: "a page shown with its properties",
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
  createdAt: "2026-09-09T22:15:37.547Z",
  updatedAt: "2026-10-30T14:49:07.395Z",
} as const satisfies Route
