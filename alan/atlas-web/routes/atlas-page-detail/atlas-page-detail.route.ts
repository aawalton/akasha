import type { Route } from "@akasha/code/route"

export const atlasPageDetail = {
  id: "01a0883d-a94b-761e-a164-2900c651ecf8",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-page-detail",
  definition: "one page, drawn with its properties",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A nav page is drawn as the page that nav item points at.",
    },
    {
      invariantKind: "departure",
      statement: "A page type reaching no page is looked for again among that type's descendants.",
    },
  ],
} as const satisfies Route
