import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReorderCommand = string

export const reorderCommand = {
  id: "01a0680d-4d00-7012-b752-2d9e6a3f4113",
  pageTypeSlug: "text-property",
  slug: "reorder-command",
  propertySlug: "reorder-command",
  definition: "the command a view hands a reordering to",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
