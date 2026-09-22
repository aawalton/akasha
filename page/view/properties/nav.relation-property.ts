import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const nav = {
  id: "01a0680d-4d00-7001-8a73-4f2c6d9e4102",
  type: "page-type/relation-property",
  slug: "nav",
  propertySlug: "nav",
  definition: "a view's nav item",
  targetPageType: "page-type/nav",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view belongs to the nav item that owns that view and is drawn nowhere else.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
