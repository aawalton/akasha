import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const owner = {
  id: "01a06c50-b15f-7d22-9f4b-7590e602dd05",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "owner",
  propertySlug: "owner",
  definition: "the property naming the account a page belongs to",
  targetPageType: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type naming no owner has pages the whole repository owns.",
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
  types: "ts",
} as const satisfies RelationProperty
