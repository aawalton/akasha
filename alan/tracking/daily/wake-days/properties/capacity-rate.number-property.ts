import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CapacityRate = number

export const capacityRate = {
  id: "01a05fd8-c30f-7486-b22b-7e17134582db",
  pageTypeSlug: "number-property",
  slug: "capacity-rate",
  propertySlug: "capacity-rate",
  definition: "how much capacity for stress an hour of a stretch gave back or took",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rate is matched by the word Alan writes in a session title.",
    },
    {
      invariantKind: "departure",
      statement: "A session naming several recovery activities credits at the best rate.",
    },
    {
      invariantKind: "gap",
      statement: "A session naming several recovery activities credits at the sum of its rates.",
    },
  ],
} as const satisfies NumberProperty
