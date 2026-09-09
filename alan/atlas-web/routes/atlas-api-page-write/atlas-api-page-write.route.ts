import type { Route } from "@akasha/code/route"

export const atlasApiPageWrite = {
  id: "01a08838-c84b-70c9-ae34-60620a677571",
  pageTypeSlug: "route",
  slug: "atlas-api-page-write",
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
