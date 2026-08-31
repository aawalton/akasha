import type { TabooTerm } from "../taboo-term.page-type.ts"

export const propertyId = {
  id: "01a05993-0ad2-7801-9a50-a9da7c695415",
  pageTypeSlug: "taboo-term",
  slug: "property-id",
  pattern: "\\bpropertyId\\b",
  tabooSenses: [
    {
      sense: "the key naming which property a declaration carries",
      instead: "propertySlug",
    },
  ],
} as const satisfies TabooTerm
