import type { Route } from "@akasha/code/route"

export const atlasTrip = {
  id: "01a0883e-5a1e-7450-ac91-ba1c3f52e21b",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-trip",
  definition: "one location collection, drawn as stops colored by when they fall",
  code: "tsx",
  urlPath: "trip/:tripParam",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stop takes its color from where its schedule falls against now.",
    },
    {
      invariantKind: "departure",
      statement: "A collection stating no title is titled Trip.",
    },
  ],
} as const satisfies Route
