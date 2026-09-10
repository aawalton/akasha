import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const surplusRing = {
  id: "01a05482-22de-75cc-8874-6771b33a0f8a",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "surplus-ring",
  definition: "the tile drawing the hours of sleep a day leaves",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The feed sends a list of stoplights and only the first is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "The one subtraction every tile drawing a falling reading makes sits here.",
    },
    {
      invariantKind: "departure",
      statement: "A reading falls by its rate times the hours since the moment it was taken.",
    },
    {
      invariantKind: "departure",
      statement: "A reading saying no moment or no rate is drawn as the feed sent it.",
    },
    {
      invariantKind: "departure",
      statement: "A reading falling at nothing an hour is drawn as the feed sent it.",
    },
    {
      invariantKind: "departure",
      statement: "A moment later than now takes nothing off the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A subtracted reading is spelled as the feed spells a figure.",
    },
    {
      invariantKind: "departure",
      statement: "A subtracted reading is drawn below zero rather than held at zero.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out the color a subtracted reading reaches.",
    },
  ],
} as const satisfies IosComponent
