import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const secrets = {
  id: "01a081fd-c5ac-72ac-acff-a780301c30e4",
  type: "page-type/multi-relation-property",
  slug: "secrets",
  propertySlug: "secrets",
  definition: "a secret a workload reads",
  targetPageType: "page-type/secret",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The secret is named by its slug rather than by the resource carrying that secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The resources a workload reads are the placements of the secrets named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource a workload reads under many keys is named one secret per key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource a controller in the cluster writes is named by no secret here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-08T17:08:07.212Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies MultiRelationProperty
