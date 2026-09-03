import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type NavSlug = Slug

export const navSlug = {
  id: "01a0680d-4d00-7001-8a73-4f2c6d9e4102",
  pageTypeSlug: "relation-property",
  slug: "nav-slug",
  propertySlug: "nav-slug",
  definition: "the nav item a view sits under",
  targetPageTypeSlug: "page-type/nav",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view belongs to the nav item that owns it and is drawn nowhere else.",
    },
  ],
} as const satisfies RelationProperty
