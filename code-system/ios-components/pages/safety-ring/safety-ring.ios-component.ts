import type { IosComponent } from "../../ios-component.page-type.ts"

export const safetyRing = {
  id: "01a05482-22dd-7359-88a2-113df882eb88",
  pageTypeSlug: "ios-component",
  slug: "safety-ring",
  definition: "the tile drawing where a safety level stands",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The feed sends a list of stoplights and only the first is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "The level is drawn whatever the level is.",
    },
    {
      invariantKind: "departure",
      statement: "A level at either end of its scale draws its number as any other level does.",
    },
    {
      invariantKind: "departure",
      statement: "A level with no tier above it draws no arc, the arc saying how far the next is.",
    },
  ],
} as const satisfies IosComponent
