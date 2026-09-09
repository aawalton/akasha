import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"
import type { PageDomain } from "./page-domain.relation-property.ts"

export type PartSlugs = List<PageDomain>

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
    {
      invariantKind: "departure",
      statement: "A page is named by exactly one parent.",
    },
  ],
} as const satisfies RelationProperty
