import type { NumberProperty } from "@akasha/pages/number-property"

export type LowestEmailInboxCount = number

export const lowestEmailInboxCount = {
  id: "01a06828-59d2-7157-9085-6ef017a64ed4",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "lowest-email-inbox-count",
  propertySlug: "lowest-email-inbox-count",
  definition: "the fewest pieces of mail Alan's inbox held at any point in the day",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The day keeps the lowest count reached rather than the count last taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A count taken later is written only where the count is lower than the count held.",
    },
    {
      invariantKind: "departure",
      statement: "A zero says the inbox reached empty rather than saying nothing was read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of a hundred means a hundred or beyond.",
    },
    {
      invariantKind: "departure",
      statement: "The count stops at a hundred.",
    },
    {
      invariantKind: "departure",
      statement: "A lowest inbox count is captured by trace.",
    },
  ],
} as const satisfies NumberProperty
