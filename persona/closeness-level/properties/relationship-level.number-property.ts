import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const relationshipLevel = {
  id: "01a0655b-4a9b-7002-96a4-5f01bb918e88",
  type: "number-property",
  slug: "relationship-level",
  propertySlug: "relationship-level",
  definition: "the rung of the closeness ladder a record is of",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level here is the level a closeness level states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level is read whether that level is stored as a number or as text.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "This property is a relation to a closeness level.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
