import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyPageDetail = {
  id: "01a174ac-f906-7d0b-83ed-7ab27d24d298",
  type: "page-type/route",
  slug: "jenny-page-detail",
  definition: "a page, or the views a nav item gathers, drawn for Jenny",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav page is drawn as the views that nav item gathers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is looked up as the signed-in reader may read it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the reader may not read is answered 404.",
    },
  ],
  createdAt: "2026-10-25T20:07:35.430Z",
  updatedAt: "2026-10-25T20:07:35.430Z",
} as const satisfies Route
