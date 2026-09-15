import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const pointsBeforeToday = {
  id: "01a08205-3006-72d5-930b-892c6e875b17",
  type: "page-type/number-property",
  slug: "points-before-today",
  propertySlug: "points-before-today",
  definition: "the points earned over the days before today",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Today's points are no part of this figure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This figure and today's points together are the total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rebuild alone moves this figure on.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
