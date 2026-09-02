import type { TextProperty } from "@akasha/pages-system/text-property"

export type JewelryTypeId = string

export const jewelryTypeId = {
  id: "01a05fd1-d43c-7d49-81c6-a1c0aa409075",
  pageTypeSlug: "text-property",
  slug: "jewelry-type-id",
  propertySlug: "type-id",
  definition: "the kind of jewelry a slot takes",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a jewelry type." },
  ],
} as const satisfies TextProperty
