import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAmazonMatch = {
  id: "01a06865-ecc2-705a-8dad-0a43e80e596b",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-amazon-match",
  definition: "an Amazon order or refund matched against the card movement it accounts for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A movement is matched by its amount and the days between the movement and the mail alone.",
    },
    {
      invariantKind: "departure",
      statement: "A charge is matched only by a movement out.",
    },
    {
      invariantKind: "departure",
      statement: "A refund is matched only by a movement in.",
    },
    {
      invariantKind: "departure",
      statement: "A charge's window opens on the order's own day and runs ten days.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refund's window opens three days before the mail and runs twenty-one days after.",
    },
    {
      invariantKind: "departure",
      statement:
        "An order with no stated total matches nothing rather than matching on the date alone.",
    },
    {
      invariantKind: "departure",
      statement: "A movement several candidates account for is an ambiguity rather than a choice.",
    },
    {
      invariantKind: "departure",
      statement: "A movement no candidate accounts for is unmatched rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A note is cut to nine hundred characters.",
    },
    {
      invariantKind: "departure",
      statement: "The order number a note ends in is never cut.",
    },
    {
      invariantKind: "departure",
      statement:
        "A note names every item with its count or names the mail's summary where no item was read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A product is named for a refund only where every line of that order names the same product.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Monarch or to a file.",
    },
  ],
} as const satisfies Module
