import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const capacityRate = {
  id: "01a05fd8-c30f-7486-b22b-7e17134582db",
  type: "page-type/number-property",
  slug: "capacity-rate",
  propertySlug: "capacity-rate",
  definition: "how much capacity for stress an hour of a stretch gave back or took",
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
} as const satisfies NumberProperty
