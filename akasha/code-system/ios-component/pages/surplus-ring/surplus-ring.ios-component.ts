import type { IosComponent } from "../../ios-component.page-type.ts"

export const surplusRing = {
  id: "01a05482-22de-75cc-8874-6771b33a0f8a",
  pageTypeSlug: "ios-component",
  slug: "surplus-ring",
  definition: "the tile drawing the hours of sleep a day leaves",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The feed sends a list of stoplights and only the first is drawn.",
    },
  ],
} as const satisfies IosComponent
