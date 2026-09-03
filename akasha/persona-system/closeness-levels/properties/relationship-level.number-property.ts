import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RelationshipLevel = number

export const relationshipLevel = {
  id: "01a0655b-4a9b-7002-96a4-5f01bb918e88",
  pageTypeSlug: "number-property",
  slug: "relationship-level",
  propertySlug: "relationship-level",
  definition: "the rung of the closeness ladder a record is of",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level here is the level a closeness level states.",
    },
    {
      invariantKind: "departure",
      statement: "A level is read whether it is stored as a number or as text.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a closeness level.",
    },
  ],
} as const satisfies NumberProperty
