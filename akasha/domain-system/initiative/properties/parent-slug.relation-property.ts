import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type ParentSlug = Slug

export const parentSlug = {
  id: "01a04e58-5735-7668-9aee-b2da5c7b346a",
  pageTypeSlug: "relation-property",
  slug: "parent-slug",
  propertySlug: "parent-slug",
  definition: "the initiative an initiative sits under",
  targetPageTypeSlug: "page-type/initiative",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative lists nothing standing beneath it.",
    },
    {
      invariantKind: "departure",
      statement: "This edge is read inverted.",
    },
  ],
} as const satisfies RelationProperty
