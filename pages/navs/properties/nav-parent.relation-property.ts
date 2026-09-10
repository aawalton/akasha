import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type NavParent = Slug

export const navParent = {
  id: "01a0680e-5e00-7001-b562-4f8a2d1c5102",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "nav-parent",
  propertySlug: "nav-parent",
  definition: "the nav item a nav item sits beneath",
  targetPageType: "page-type/nav",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Navigation is one level deep or two.",
    },
    {
      invariantKind: "departure",
      statement: "A nav item naming no parent is at the top.",
    },
  ],
} as const satisfies RelationProperty
