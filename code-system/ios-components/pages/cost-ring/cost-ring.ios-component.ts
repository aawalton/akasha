import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const costRing = {
  id: "01a08bbb-de99-7239-ae5c-c8f4b66aefa3",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "cost-ring",
  definition: "the tile drawing what an hour of the block a person is in costs",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The feed sends a list of stoplights and only the first is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A stoplight carrying an empty figure draws no signal rather than a black ring.",
    },
    {
      invariantKind: "departure",
      statement: "A cost the feed carries is drawn whatever color that cost reached.",
    },
  ],
} as const satisfies IosComponent
