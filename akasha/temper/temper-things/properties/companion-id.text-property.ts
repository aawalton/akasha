import type { TextProperty } from "@akasha/pages-system/text-property"

export type CompanionId = string

export const companionId = {
  id: "01a05fba-ce39-74ad-926f-d6a5d9908dfc",
  pageTypeSlug: "text-property",
  slug: "companion-id",
  propertySlug: "companion-id",
  definition: "the companion a page is about",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to  a companion." }],
} as const satisfies TextProperty
