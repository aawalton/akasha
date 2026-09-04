import type { Slug } from "../../properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.ts"

export type OwnerSlug = Slug

export const ownerSlug = {
  id: "01a06c50-b15f-7d22-9f4b-7590e602dd05",
  pageTypeSlug: "relation-property",
  slug: "owner-slug",
  propertySlug: "owner-slug",
  definition: "the property naming the account a page belongs to",
  targetPageTypeSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type naming no owner holds pages the whole repository owns.",
    },
    {
      invariantKind: "departure",
      statement: "A page type extending another page type takes that page type's owner.",
    },
    {
      invariantKind: "departure",
      statement: "A narrow on who owns a page is lowered onto the property a page type names.",
    },
  ],
} as const satisfies RelationProperty
