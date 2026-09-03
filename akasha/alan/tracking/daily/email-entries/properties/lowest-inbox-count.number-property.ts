import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LowestInboxCount = number

export const lowestInboxCount = {
  id: "01a06828-59d2-7157-9085-6ef017a64ed4",
  pageTypeSlug: "number-property",
  slug: "lowest-inbox-count",
  propertySlug: "lowest-inbox-count",
  definition: "the fewest pieces of mail Alan's inbox held at any point in the day",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The day keeps the lowest count reached rather than the count last taken.",
    },
    {
      invariantKind: "departure",
      statement: "A count taken later is written only where the count is lower than the one held.",
    },
    {
      invariantKind: "departure",
      statement: "A zero says the inbox reached empty rather than saying nothing was read.",
    },
  ],
} as const satisfies NumberProperty
