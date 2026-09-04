import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"
import type { DomainSlug } from "./domain-slug.relation-property.ts"

export type PartSlugs = List<DomainSlug>

export const partSlugs = {
  id: "01a049cb-c488-7b90-ba0a-f6463fcda254",
  pageTypeSlug: "relation-property",
  slug: "part-slugs",
  propertySlug: "part-slugs",
  definition: "the domains this one is made of, in the order they are read",
  targetPageTypeSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's parent is this edge inverted.",
    },
  ],
} as const satisfies RelationProperty
