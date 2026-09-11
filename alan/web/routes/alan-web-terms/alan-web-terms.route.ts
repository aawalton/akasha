import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebTerms = {
  id: "01a08829-98dd-78b3-af25-0ea47d32f1b5",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-terms",
  definition: "the terms the Amy messaging service is offered under",
  code: "tsx",
  urlPath: "terms",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page carries verbatim the sentence a carrier requires on mobile information.",
    },
  ],
} as const satisfies Route
