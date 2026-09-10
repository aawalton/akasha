import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const clusterServices = {
  id: "01a05b26-f8b6-7334-a5d4-d44ab19e071e",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "cluster-services",
  propertySlug: "cluster-services",
  definition: "the cluster services running a web app",
  targetPageType: "page-type/cluster-service",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A web app naming more than one leaves which workload a deploy puts up unsettled.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no cluster service page has is refused.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
