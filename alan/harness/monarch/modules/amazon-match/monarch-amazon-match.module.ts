import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAmazonMatch = {
  id: "01a06865-ecc2-705a-8dad-0a43e80e596b",
  type: "module",
  slug: "monarch-amazon-match",
  definition: "an Amazon order or refund matched against the card movement it accounts for",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A movement is matched by its amount and the days between the movement and the mail alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A charge is matched only by a movement out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refund is matched only by a movement in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A charge's window opens on the order's own day and runs ten days.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refund's window opens three days before the mail and runs twenty-one days after.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An order with no stated total matches nothing rather than matching on the date alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A movement several candidates account for is an ambiguity rather than a choice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A movement no candidate accounts for is unmatched rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A note is cut to nine hundred characters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The order number a note ends in is never cut.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A note names every item with its count or names the mail's summary where no item was read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A product is named for a refund only where every line of that order names the same product.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to Monarch or to a file.",
    },
  ],
} as const satisfies Module
