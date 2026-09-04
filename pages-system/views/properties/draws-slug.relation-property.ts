import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type DrawsSlug = Slug

export const drawsSlug = {
  id: "01a0680d-4d00-7000-9e21-5c8a3f7b4101",
  pageTypeSlug: "relation-property",
  slug: "draws-slug",
  propertySlug: "draws-slug",
  definition: "the page type a view draws the pages of",
  targetPageTypeSlug: "page-type/page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view drawing one page type names it here.",
    },
    {
      invariantKind: "departure",
      statement: "A view drawing pages of whatever types a predicate matches names none.",
    },
  ],
} as const satisfies RelationProperty
