import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasMap = {
  id: "01a0883d-3b05-7404-bc35-cbb827588fe9",
  type: "page-type/route",
  slug: "atlas-map",
  definition: "every location a reader has saved, drawn as pins",
  code: "tsx",
  urlPath: "map",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A location with no coordinates is not drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build with no basemap url draws the locations without a basemap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pins are drawn again as soon as a location changes.",
    },
  ],
} as const satisfies Route
