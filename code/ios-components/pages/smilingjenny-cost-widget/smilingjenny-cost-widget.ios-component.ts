import type { IosComponent } from "akasha/code/ios-components/ios-component.page-type.types.ts"

export const smilingjennyCostWidget = {
  id: "01a08bb4-8f4f-7297-9c23-8360a4bbe920",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "smilingjenny-cost-widget",
  definition: "Jenny's tile for what the block Alan is in costs him each hour",
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
      statement: "A refused fetch tells Jenny to update the app rather than showing no signal.",
    },
    {
      invariantKind: "departure",
      statement: "A tap on this tile opens nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Jenny's app holds no page for the cost.",
    },
    {
      invariantKind: "departure",
      statement: "The caption counts down in timer form rather than in spelled words.",
    },
  ],
} as const satisfies IosComponent
