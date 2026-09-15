import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const smilingjennyUpkeepStoplightsWidget = {
  id: "01a08bf1-5b1b-7c9a-acac-0bce6dc7c0f0",
  type: "page-type/ios-component",
  slug: "smilingjenny-upkeep-stoplights-widget",
  definition: "Jenny's tile for the stoplight on each of Alan's upkeep readings",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ring drawn is the one Alan's upkeep tile draws rather than one of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stoplight a ring is handed is decoded as the shape every ring is handed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color of a reading that is not falling is read off the feed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color of a falling reading is read off the figure this tile draws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "However many stoplights the feed sends is however many rings are drawn.",
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
      statement: "Jenny's app holds no page for the upkeep.",
    },
  ],
} as const satisfies IosComponent
