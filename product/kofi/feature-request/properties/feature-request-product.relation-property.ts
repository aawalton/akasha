import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const featureRequestProduct = {
  id: "01a0c4a6-ca45-7fb5-9213-210805796619",
  type: "page-type/relation-property",
  slug: "feature-request-product",
  propertySlug: "product",
  definition: "a feature request's product",
  targetPageType: "page-type/domain",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The product a feature request names serves a site of its own.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
