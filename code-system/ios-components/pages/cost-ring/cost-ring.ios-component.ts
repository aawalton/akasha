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
      statement: "A cost carrying the instant the surplus falls past a rung counts down to it.",
    },
    {
      invariantKind: "departure",
      statement: "The feed sends that instant rather than a wait, a wait being stale at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "The wait shrinks a second a second whatever the rate, so no rate reaches the phone.",
    },
    {
      invariantKind: "departure",
      statement: "A cost carrying no such instant keeps the caption the readout's page names.",
    },
    {
      invariantKind: "departure",
      statement: "An instant already gone is no instant, the caption falling back to the label.",
    },
    {
      invariantKind: "departure",
      statement: "The instant is read by the reader the falling figure is read by.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The instant is judged gone against the moment drawn, so one passing between draws stands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out when a surplus reaches a rung.",
    },
  ],
} as const satisfies IosComponent
