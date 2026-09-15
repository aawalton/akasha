import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const safetyRing = {
  id: "01a05482-22dd-7359-88a2-113df882eb88",
  type: "ios-component",
  slug: "safety-ring",
  definition: "the tile drawing where a safety level stands",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The feed sends a list of stoplights and only the first is drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether a level past either end of its scale draws its number is read off the reading sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading saying nothing of that has the level past either end draw no number.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out whether a level past either end draws its number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level with no tier above that level draws no arc.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arc says how far the next tier is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stoplight every ring is handed carries the moment taken and the fall rate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stoplight sent without either is decoded rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stoplight asked for its figure at a moment subtracts the clock in one place.",
    },
  ],
} as const satisfies IosComponent
