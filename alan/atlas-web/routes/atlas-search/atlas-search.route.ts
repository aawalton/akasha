import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const atlasSearch = {
  id: "01a0883f-0826-7e5c-8e46-5e2a38ee8554",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-search",
  definition: "the places a reader looks up and keeps",
  code: "tsx",
  urlPath: "search",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The looking up and the keeping both happen in the browser.",
    },
    {
      invariantKind: "departure",
      statement: "A place already kept is a link to the location rather than a button.",
    },
  ],
} as const satisfies Route
