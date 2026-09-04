import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type WorkflowClusterServiceSlugs = List<Slug>

export const workflowClusterServiceSlugs = {
  id: "01a06810-7000-7001-9b52-8e3d7a4f7102",
  pageTypeSlug: "relation-property",
  slug: "workflow-cluster-service-slugs",
  propertySlug: "cluster-service-slugs",
  definition: "the services a workflow builds and puts onto the cluster",
  targetPageTypeSlug: "page-type/cluster-service",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workflow naming no service builds something the cluster does not run.",
    },
  ],
} as const satisfies RelationProperty
