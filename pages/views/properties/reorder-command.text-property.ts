import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ReorderCommand = string

export const reorderCommand = {
  id: "01a0680d-4d00-7012-b752-2d9e6a3f4113",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "reorder-command",
  propertySlug: "reorder-command",
  definition: "the command a view hands a reordering to",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
