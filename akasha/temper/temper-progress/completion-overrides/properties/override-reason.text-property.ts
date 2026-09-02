import type { TextProperty } from "@akasha/pages-system/text-property"

export type OverrideReason = string

export const overrideReason = {
  id: "01a05fd0-3aa7-73f0-9c3b-150ba0630621",
  pageTypeSlug: "text-property",
  slug: "override-reason",
  propertySlug: "override-reason",
  definition: "why a count is set by hand instead of taken from the game",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
