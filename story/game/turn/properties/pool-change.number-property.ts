import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const poolChange = {
  id: "01a0c692-2e25-72d0-adc5-dd1ff6c6b65a",
  type: "page-type/number-property",
  slug: "pool-change",
  propertySlug: "change",
  definition: "how much a turn took from a pool or gave back to it",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a turn took is written under, and what a turn gave back is written over.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
