import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const coverImages = {
  id: "01a0c5ea-6e76-73f6-b81b-71e1f401d9e4",
  type: "page-type/relation-property",
  slug: "cover-images",
  propertySlug: "covers",
  definition: "the pictures a persona is shown by, each at a rung of closeness",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover states the rung it was made for on its own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cover shown is the one at the rung the persona has reached.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
