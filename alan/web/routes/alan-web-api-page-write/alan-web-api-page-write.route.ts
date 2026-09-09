import type { Route } from "@akasha/code/route"

export const alanWebApiPageWrite = {
  id: "01a0882c-bfbe-7b18-9cbf-ce33bfbb3bce",
  pageTypeSlug: "route",
  slug: "alan-web-api-page-write",
  definition: "the page a reader's browser asks to have written",
  code: "ts",
  urlPath: "api/page-write",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This route's action is the only thing this route's code exports.",
    },
  ],
} as const satisfies Route
