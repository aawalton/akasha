import type { TextProperty } from "@akasha/pages-system/text-property"

export type SubcategoryId = string

export const subcategoryId = {
  id: "01a05fba-ce3b-7c4b-adf4-7b752fef3058",
  pageTypeSlug: "text-property",
  slug: "subcategory-id",
  propertySlug: "subcategory-id",
  definition: "the narrower group a thing is filed under",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to  a subcategory." },
  ],
} as const satisfies TextProperty
