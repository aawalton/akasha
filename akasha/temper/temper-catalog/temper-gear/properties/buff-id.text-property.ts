import type { TextProperty } from "@akasha/pages-system/text-property"

export type BuffId = string

export const buffId = {
  id: "01a05fcc-41f1-7e7a-abd6-c8c6650999ad",
  pageTypeSlug: "text-property",
  slug: "buff-id",
  propertySlug: "buff-id",
  definition: "the helpful effect a thing puts on whoever uses it",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a buff." }],
} as const satisfies TextProperty
