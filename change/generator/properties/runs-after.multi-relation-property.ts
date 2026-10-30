import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const runsAfter = {
  id: "01a0d4dc-8d4d-7b8d-8b1e-fd710d4c8667",
  type: "page-type/multi-relation-property",
  slug: "runs-after",
  propertySlug: "runs-after",
  definition: "a change generator that writes what this change generator reads",
  targetPageType: "page-type/change-generator",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator names another here only where it reads what that one writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Change generators naming each other in a ring are refused rather than ordered.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T19:20:19.021Z",
  updatedAt: "2026-10-30T17:04:13.320Z",
} as const satisfies MultiRelationProperty
