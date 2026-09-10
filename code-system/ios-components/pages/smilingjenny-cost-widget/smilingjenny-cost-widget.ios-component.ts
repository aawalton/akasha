import type { IosComponent } from "../../ios-component.page-type.types.ts"

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
      statement: "A cost carries no tier above and no fraction climbed, so no arc is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A refused fetch tells Jenny to update the app rather than showing no signal.",
    },
    {
      invariantKind: "departure",
      statement: "A tap on this tile opens nothing, Jenny's app holding no page for the cost.",
    },
  ],
} as const satisfies IosComponent
