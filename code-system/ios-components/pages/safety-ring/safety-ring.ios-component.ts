import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const safetyRing = {
  id: "01a05482-22dd-7359-88a2-113df882eb88",
  pageTypeSlug: "ios-component",
  type: "ios-component",
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
      statement:
        "Whether a level past either end of its scale draws its number is read off the reading sent.",
    },
    {
      invariantKind: "departure",
      statement: "A reading saying nothing of that has the level past either end draw no number.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out whether a level past either end draws its number.",
    },
    {
      invariantKind: "departure",
      statement: "A level with no tier above that level draws no arc.",
    },
    {
      invariantKind: "departure",
      statement: "The arc says how far the next tier is.",
    },
  ],
} as const satisfies IosComponent
