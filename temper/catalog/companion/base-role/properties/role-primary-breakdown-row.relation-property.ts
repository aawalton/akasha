import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const rolePrimaryBreakdownRow = {
  id: "01a0e115-3c24-76d2-92e2-d7349a1732e4",
  type: "page-type/relation-property",
  slug: "role-primary-breakdown-row",
  propertySlug: "primary-breakdown-row",
  definition: "the row of a rotation breakdown a companion playing a role is judged by",
  targetPageType: "page-type/temper-rotation-breakdown-row",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion build's rotation breakdown draws the row each of its roles states in bold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A role stating no row makes no row bold.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
