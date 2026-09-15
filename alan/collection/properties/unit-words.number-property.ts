import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const unitWords = {
  id: "01a06959-98a7-7ec0-bc21-02de65c2abf5",
  type: "number-property",
  slug: "unit-words",
  propertySlug: "unit-words",
  definition: "how many words one of the collection's unit is worth",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "This value is read off the unit the collection names rather than stated on that collection.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value read is the unit's own `words`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A total counted in this unit is absent where the collection states no unit words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A total counted in this unit is absent where the unit words are zero.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A formula cannot yet read a property off the page a relation reaches.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
