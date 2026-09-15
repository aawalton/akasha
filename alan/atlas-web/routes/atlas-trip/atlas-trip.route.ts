import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasTrip = {
  id: "01a0883e-5a1e-7450-ac91-ba1c3f52e21b",
  type: "page-type/route",
  slug: "atlas-trip",
  definition: "one location collection and the locations naming it, listed as that trip's stops",
  code: "tsx",
  urlPath: "trip/:tripParam",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A collection stating no title is titled Trip.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A trip's stops are the locations naming this collection by page type and slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop is drawn in scheduled order, and an unscheduled stop is drawn first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "At most a thousand stops are drawn, and the page says so where more match.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A collection nothing names says so rather than drawing an empty list.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No map is drawn here, and the map route draws every location instead.",
    },
  ],
} as const satisfies Route
