import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasSearch = {
  id: "01a0883f-0826-7e5c-8e46-5e2a38ee8554",
  type: "page-type/route",
  slug: "atlas-search",
  definition: "the places a reader looks up and keeps",
  code: "tsx",
  urlPath: "search",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The looking up and the keeping happen in the browser.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A place already kept is a link to the location rather than a button.",
    },
  ],
} as const satisfies Route
