import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const relationshipLevel = {
  id: "01a0655b-4a9b-7002-96a4-5f01bb918e88",
  type: "page-type/number-property",
  slug: "relationship-level",
  propertySlug: "relationship-level",
  definition: "a record's rung on the closeness ladder",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A level here is the level a closeness level states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level is read whether that level is stored as a number or as text.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A level here is a bare number and its page's name is `level-` joined to it.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a closeness level.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
