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
      statement: "The ring drawn is the ring the surplus tile draws rather than a ring of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The color is read off the feed rather than worked out on the phone.",
    },
    {
      invariantKind: "departure",
      statement: "A cost carries no tier above and no fraction climbed.",
    },
    {
      invariantKind: "departure",
      statement: "No arc is drawn for such a cost.",
    },
    {
      invariantKind: "departure",
      statement: "The caption counts down to the rung the surplus is about to fall past.",
    },
    {
      invariantKind: "departure",
      statement: "Which moment that is comes off the feed rather than being worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "The caption counts down in timer form rather than in spelled words.",
    },
  ],
} as const satisfies IosComponent
