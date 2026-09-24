import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const unitMaxMemoryMb = {
  id: "01a0d5a5-6668-7635-9c7e-ee047d406248",
  type: "page-type/number-property",
  slug: "unit-max-memory-mb",
  propertySlug: "max-memory-mb",
  definition: "the most memory a unit may hold before the kernel reclaims, in megabytes",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit past these megabytes is slowed by reclaiming rather than ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These megabytes are the unit's `MemoryHigh`.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
