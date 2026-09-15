import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const categorizeRing = {
  id: "01a05482-22db-796e-b0e4-76ec3c1bb83e",
  type: "ios-component",
  slug: "categorize-ring",
  definition: "the tile drawing how many transactions are unreviewed",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ring is drawn whole in one color rather than swept to a fraction.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color is the color the feed's scale gives the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading the feed sends no scale for is ringed in the track's own gray.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count is drawn in the label's color whatever the ring is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading of nothing is drawn as the words or the emoji sent for that reading.",
    },
  ],
} as const satisfies IosComponent
