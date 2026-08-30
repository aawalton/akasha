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
      statement: "The arc is the share of the month's intake already reviewed.",
    },
    {
      invariantKind: "departure",
      statement: "Where the feed sends no intake the tile has no reading at all and draws a dash.",
    },
    {
      invariantKind: "departure",
      statement: "A color the feed's scale gives stands over the one the arc's own bands give.",
    },
  ],
} as const satisfies IosComponent
