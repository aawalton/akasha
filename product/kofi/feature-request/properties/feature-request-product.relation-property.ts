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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader who may not read domains sees a request's product as the name its address ends in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No domain page is published so that a request can name its product.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
