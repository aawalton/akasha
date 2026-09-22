import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiAsk = {
  id: "01a0c6b7-3bf9-7fd2-9dbc-f7137c263122",
  type: "page-type/route",
  slug: "alan-web-api-ask",
  definition: "the answer to a question Alan's browser puts to the page store",
  code: "ts",
  urlPath: "api/ask",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "This route exports `action` alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every composed query a browser makes reaches the page store through this route.",
    },
  ],
} as const satisfies Route
