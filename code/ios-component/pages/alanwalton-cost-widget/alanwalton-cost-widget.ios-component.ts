import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonCostWidget = {
  id: "01a08bb4-3dee-7e6f-8126-950faba3221d",
  type: "ios-component",
  slug: "alanwalton-cost-widget",
  definition: "Alan's tile for what the block he is in costs him each hour",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ring drawn is the ring the surplus tile draws rather than a ring of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color is read off the feed rather than worked out on the phone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost carries no tier above and no fraction climbed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No arc is drawn for such a cost.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The caption counts down to the rung the surplus is about to fall past.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which moment that is comes off the feed rather than being worked out here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The caption counts down as a bare timer rather than in spelled words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is written after the count, so the tile reads as the count alone.",
    },
  ],
} as const satisfies IosComponent
