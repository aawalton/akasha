import type { Route } from "@akasha/code/route"

export const atlasMap = {
  id: "01a0883d-3b05-7404-bc35-cbb827588fe9",
  pageTypeSlug: "route",
  slug: "atlas-map",
  definition: "every location a reader has saved, drawn as pins",
  code: "tsx",
  urlPath: "map",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A location with no coordinates is not drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A build with no basemap url draws the locations without a basemap.",
    },
  ],
} as const satisfies Route
