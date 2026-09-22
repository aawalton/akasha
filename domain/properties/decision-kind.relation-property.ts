import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const decisionKind = {
  id: "01a04d66-767b-740d-a958-1f84e5858ad0",
  type: "page-type/relation-property",
  slug: "decision-kind",
  propertySlug: "decision-kind",
  definition: "which sort of decision an entry is",
  targetPageType: "page-type/decision-kind",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The plain word `kind` names the kind of value a property holds rather than the kind of decision.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
