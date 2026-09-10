import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const alanwaltonCostWidget = {
  id: "01a08bb4-3dee-7e6f-8126-950faba3221d",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "alanwalton-cost-widget",
  definition: "Alan's tile for what the block he is in costs him each hour",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ring drawn is the one the surplus tile draws rather than one of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The color is read off the feed rather than worked out on the phone.",
    },
    {
      invariantKind: "departure",
      statement: "A cost carries no tier above and no fraction climbed, so no arc is drawn.",
    },
  ],
} as const satisfies IosComponent
