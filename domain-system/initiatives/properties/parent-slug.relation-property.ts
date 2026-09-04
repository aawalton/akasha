import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

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
      statement: "An initiative lists nothing standing beneath that initiative.",
    },
    {
      invariantKind: "departure",
      statement: "This edge is read inverted.",
    },
  ],
} as const satisfies RelationProperty
