import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiShape = {
  id: "01a0e17c-6623-70a6-ab15-2e192f21e346",
  type: "page-type/route",
  slug: "alan-web-api-shape",
  definition: "the shape of a page type a browser asks for",
  code: "ts",
  urlPath: "api/shape",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "This route exports `action` alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The screens any page falls back to read a page type's shape through this route.",
    },
  ],
  createdAt: "2026-09-27T06:10:21.347Z",
  updatedAt: "2026-10-30T17:02:42.603Z",
} as const satisfies Route
