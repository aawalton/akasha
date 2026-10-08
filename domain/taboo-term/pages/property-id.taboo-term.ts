import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const propertyId = {
  id: "01a05993-0ad2-7801-9a50-a9da7c695415",
  type: "page-type/taboo-term",
  slug: "property-id",
  pattern: "\\bpropertyId\\b",
  tabooSenses: [
    {
      sense: "the key naming which property a declaration carries",
      instead: "propertySlug",
    },
  ],
  createdAt: "2026-08-31T20:46:43.922Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
