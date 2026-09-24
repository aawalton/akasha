import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const serviceClusters = {
  id: "01a05b26-f8b6-7334-a5d4-d44ab19e071e",
  type: "page-type/multi-relation-property",
  slug: "service-clusters",
  propertySlug: "service-clusters",
  definition: "the cluster services running a web app",
  targetPageType: "page-type/service-cluster",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app naming more than one leaves which workload a deploy puts up unsettled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no cluster service page has is refused.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
