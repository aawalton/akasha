import type { TextProperty } from "@akasha/pages-system/text-property"

export type GbwwReadings = string

export const gbwwReadings = {
  id: "01a06577-f385-7702-a611-a508ed1f473c",
  pageTypeSlug: "text-property",
  slug: "gbww-readings",
  propertySlug: "gbww-readings",
  definition: "the Great Books readings a story is set against",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
