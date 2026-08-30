import type { IosComponent } from "../../ios-component.page-type.ts"

export const categorizeRing = {
  id: "01a05482-22db-796e-b0e4-76ec3c1bb83e",
  pageTypeSlug: "ios-component",
  slug: "categorize-ring",
  definition: "the tile drawing how many transactions are unreviewed",
  swift: "swift",
  invariants: [
    {
      invariantKind: "absence",
      statement: "The tile draws no arc.",
    },
    {
      invariantKind: "departure",
      statement: "The count takes the color the feed's scale gives it.",
    },
    {
      invariantKind: "departure",
      statement: "A count the feed sends no scale for takes the label's color.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of nothing is drawn as the words or the emoji sent for it.",
    },
  ],
} as const satisfies IosComponent
