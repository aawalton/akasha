import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const recipes = {
  id: "01a05fd1-d43d-7c95-8ac4-1739e09c409e",
  type: "page-type/record-property",
  slug: "recipes",
  propertySlug: "recipes",
  definition: "the reagent sets a drink is brewed from, one set to an entry",
  properties: [
    {
      pageProperty: "multi-relation-property/recipe-reagents",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reagent set brews the same drink.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
