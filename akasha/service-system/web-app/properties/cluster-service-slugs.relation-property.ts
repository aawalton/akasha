import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ClusterServiceSlugs = List<Slug>

export const clusterServiceSlugs = {
  id: "01a05b26-f8b6-7334-a5d4-d44ab19e071e",
  pageTypeSlug: "relation-property",
  slug: "cluster-service-slugs",
  propertySlug: "cluster-service-slugs",
  definition: "the cluster services running a web app",
  targetPageTypeSlug: "page-type/cluster-service",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A web app naming more than one leaves which workload a deploy puts up unsettled.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no cluster service page carries is refused.",
    },
  ],
} as const satisfies RelationProperty
