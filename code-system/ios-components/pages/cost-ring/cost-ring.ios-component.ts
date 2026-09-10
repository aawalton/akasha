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
    {
      invariantKind: "departure",
      statement:
        "A cost carrying the surplus that cost was colored with counts down to that surplus.",
    },
    {
      invariantKind: "departure",
      statement: "The wait is aimed from the figure as of the moment drawn rather than as taken.",
    },
    {
      invariantKind: "departure",
      statement: "A rung already crossed is never aimed at.",
    },
    {
      invariantKind: "departure",
      statement: "The rung under a crossed rung is aimed at.",
    },
    {
      invariantKind: "departure",
      statement: "The wait shrinks a second a second whatever the rate.",
    },
    {
      invariantKind: "departure",
      statement: "The rate fixes the moment only.",
    },
    {
      invariantKind: "departure",
      statement: "A cost carrying no such surplus keeps the caption the readout's page names.",
    },
    {
      invariantKind: "departure",
      statement: "The color is read again from the surplus as of the moment drawn.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which band a cost is priced in is read back off the color the server drew rather than the figure.",
    },
    {
      invariantKind: "departure",
      statement: "A figure is floored before that figure is sent.",
    },
    {
      invariantKind: "departure",
      statement: "A band read off a figure reads wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A cost drawn green or black is left as the server drew that cost.",
    },
    {
      invariantKind: "departure",
      statement: "The moment the wait runs out is the moment the color moves and the aim changes.",
    },
    {
      invariantKind: "departure",
      statement: "That moment is handed to the feed.",
    },
    {
      invariantKind: "departure",
      statement: "The feed draws the tile again at that moment.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which rungs a scale has.",
    },
  ],
} as const satisfies IosComponent
