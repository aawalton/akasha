import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const atlasTrip = {
  id: "01a0883e-5a1e-7450-ac91-ba1c3f52e21b",
  type: "route",
  slug: "atlas-trip",
  definition: "one location collection, named and said to carry stops nothing reaches",
  code: "tsx",
  urlPath: "trip/:tripParam",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection stating no title is titled Trip.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing reaches the locations that name a collection, so no stop is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "The page says the stops went unasked rather than showing a map with none.",
    },
  ],
} as const satisfies Route
