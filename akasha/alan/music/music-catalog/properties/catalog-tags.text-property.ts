import type { TextProperty } from "@akasha/pages-system/text-property"

export type CatalogTags = string

export const catalogTags = {
  id: "01a06243-144b-7005-8bb2-65b66c5911d0",
  pageTypeSlug: "text-property",
  slug: "catalog-tags",
  propertySlug: "tags",
  definition: "a word Alan files a page under",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tag is Alan's own rather than the provider's.",
    },
  ],
} as const satisfies TextProperty
