import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebTerms = {
  id: "01a08829-98dd-78b3-af25-0ea47d32f1b5",
  type: "page-type/route",
  slug: "alan-web-terms",
  definition: "the rules for the text messages Amy sends",
  code: "tsx",
  urlPath: "terms",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page carries verbatim the sentence a carrier requires on mobile information.",
    },
  ],
  createdAt: "2026-09-09T21:53:42.621Z",
  updatedAt: "2026-10-30T17:01:39.956Z",
} as const satisfies Route
