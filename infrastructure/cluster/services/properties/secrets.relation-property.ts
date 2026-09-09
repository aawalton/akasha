import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Secrets = List<Slug>

export const secrets = {
  id: "01a081fd-c5ac-72ac-acff-a780301c30e4",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "secrets",
  propertySlug: "secrets",
  definition: "a secret a workload reads",
  targetPageType: "page-type/secret",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The secret is named by its slug rather than by the resource with it.",
    },
    {
      invariantKind: "departure",
      statement: "The resources a workload reads are the placements of the secrets named here.",
    },
    {
      invariantKind: "departure",
      statement: "A resource a workload reads under many keys is named one secret per key.",
    },
  ],
} as const satisfies RelationProperty
