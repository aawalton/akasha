import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const featureRequestProposer = {
  id: "01a0c4f6-195d-79ef-8c03-3aa9a4c2c2a3",
  type: "page-type/relation-property",
  slug: "feature-request-proposer",
  propertySlug: "proposer",
  definition: "the contributor who opened a feature request and paid to open it",
  targetPageType: "page-type/contributor",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a proposer paid to open a request boosts it as any other boost does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A denial refunds no part of what the proposer paid to open the request.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
