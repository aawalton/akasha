import type { NumberProperty } from "@akasha/pages-system/number-property"

export type UnitWords = number

export const unitWords = {
  id: "01a06959-98a7-7ec0-bc21-02de65c2abf5",
  pageTypeSlug: "number-property",
  slug: "unit-words",
  propertySlug: "unit-words",
  definition: "how many words one of the collection's unit is worth",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This value is read off the unit the collection names rather than stated on it.",
    },
    {
      invariantKind: "departure",
      statement: "The value read is the unit's own `words`.",
    },
    {
      invariantKind: "gap",
      statement: "A formula cannot yet read a property off the page a relation reaches.",
    },
  ],
} as const satisfies NumberProperty
