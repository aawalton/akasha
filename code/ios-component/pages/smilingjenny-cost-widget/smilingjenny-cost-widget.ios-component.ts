import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const smilingjennyCostWidget = {
  id: "01a08bb4-8f4f-7297-9c23-8360a4bbe920",
  type: "ios-component",
  slug: "smilingjenny-cost-widget",
  definition: "Jenny's tile for what the block Alan is in costs him each hour",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ring drawn is the one the surplus tile draws rather than one of its own.",
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
      statement: "A refused fetch tells Jenny to update the app rather than showing no signal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tap on this tile opens nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Jenny's app holds no page for the cost.",
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
