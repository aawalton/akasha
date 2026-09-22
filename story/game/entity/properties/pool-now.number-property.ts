import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const poolNow = {
  id: "01a0c671-1075-74fd-9fb2-e5796664d4b3",
  type: "page-type/number-property",
  slug: "pool-now",
  propertySlug: "now",
  definition: "how much of a pool an entity has left",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The most a pool holds comes from a mechanic, and only what is left is written.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
