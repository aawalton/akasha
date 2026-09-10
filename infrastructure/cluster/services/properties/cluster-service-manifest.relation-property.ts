import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type ClusterServiceManifest = Slug

export const clusterServiceManifest = {
  id: "01a07317-ae51-7f69-a24e-d94859315637",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "cluster-service-manifest",
  propertySlug: "manifest",
  definition: "the manifest a cluster service is applied as",
  targetPageType: "page-type/manifest",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifest is named by its slug rather than by the path its code sits at.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest page claims the code file.",
    },
    {
      invariantKind: "departure",
      statement: "The index answers for the code file.",
    },
  ],
} as const satisfies RelationProperty
