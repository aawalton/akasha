import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const capacityRate = {
  id: "01a05fd8-c30f-7486-b22b-7e17134582db",
  type: "page-type/number-property",
  slug: "capacity-rate",
  propertySlug: "capacity-rate",
  definition: "the change in capacity for stress over an hour of a tracked session",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rate is matched by the word Alan writes in a session title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session naming several recovery activities credits at the sum of its rates.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-10-30T16:39:14.537Z",
} as const satisfies NumberProperty
