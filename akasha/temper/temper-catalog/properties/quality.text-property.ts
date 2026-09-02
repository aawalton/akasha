import type { TextProperty } from "@akasha/pages-system/text-property"

export type Quality = string

export const quality = {
  id: "01a05fb0-3ced-77db-9e30-4e6234c93115",
  pageTypeSlug: "text-property",
  slug: "quality",
  propertySlug: "quality",
  definition: "the grade a thing is made at",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a quality." }],
} as const satisfies TextProperty
