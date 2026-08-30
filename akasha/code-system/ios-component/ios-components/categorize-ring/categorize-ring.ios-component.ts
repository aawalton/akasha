import type { IosComponent } from "../../ios-component.page-type.ts"

export const categorizeRing = {
  id: "01a05482-22db-796e-b0e4-76ec3c1bb83e",
  pageTypeSlug: "ios-component",
  slug: "categorize-ring",
  definition: "the tile drawing how many transactions are unreviewed",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ring is drawn whole in one color rather than swept to a fraction.",
    },
    {
      invariantKind: "departure",
      statement: "The color is the one the feed's scale gives the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading the feed sends no scale for is ringed in the track's own gray.",
    },
    {
      invariantKind: "departure",
      statement: "The count is drawn in the label's color whatever the ring is.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of nothing is drawn as the words or the emoji sent for it.",
    },
  ],
} as const satisfies IosComponent
