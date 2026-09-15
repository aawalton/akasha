import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const costRing = {
  id: "01a08bbb-de99-7239-ae5c-c8f4b66aefa3",
  type: "ios-component",
  slug: "cost-ring",
  definition: "the tile drawing what an hour of the block a person is in costs",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The feed sends a list of stoplights and only the first is drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stoplight carrying an empty figure draws no signal rather than a black ring.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost the feed carries is drawn whatever color that cost reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A cost carrying the surplus that cost was colored with counts down to that surplus.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The wait is aimed from the figure as of the moment drawn rather than as taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rung already crossed is never aimed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rung under a crossed rung is aimed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The wait shrinks a second a second whatever the rate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rate fixes the moment only.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost carrying no such surplus keeps the caption the readout's page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color is read again from the surplus as of the moment drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The surplus the color is read again from is the figure in hours rather than a tier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost drawn yellow is yellow while the surplus is over minus four hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost drawn yellow is red while the surplus is over minus eight hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost drawn red is red while the surplus is over minus eight hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost drawn yellow or red is black once the surplus is minus eight hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost sent red is priced in one of two bands that fall together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which band a cost is priced in is read back off the color the server drew rather than the figure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A figure is floored before that figure is sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A band read off a figure reads wrong.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost drawn any color but yellow or red is left as the server drew that cost.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost carrying a surplus that is not falling is left as the server drew it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The moment the wait runs out is the moment the color moves and the aim changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That moment is handed to the feed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The feed draws the tile again at that moment.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which rungs a scale has.",
    },
  ],
} as const satisfies IosComponent
