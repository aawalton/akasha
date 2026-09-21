import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const unitWords = {
  id: "01a06959-98a7-7ec0-bc21-02de65c2abf5",
  type: "page-type/computed-property",
  slug: "unit-words",
  propertySlug: "unit-words",
  definition: "how many words one of the collection's unit is worth",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This value is read off the unit the collection names rather than stated on that collection.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value read is the unit's own `words`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit is reached by the address the collection names rather than by a slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection naming no unit is worth no words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose unit is no page is worth no words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A total counted in this unit is absent where the collection states no unit words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A total counted in this unit is absent where the unit words are zero.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
