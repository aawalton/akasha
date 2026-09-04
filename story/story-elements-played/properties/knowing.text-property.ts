import type { TextProperty } from "@akasha/pages-system/text-property"

export type Knowing = string

export const knowing = {
  id: "01a06828-cb93-7f9c-89f9-65e57b1e1b0f",
  pageTypeSlug: "text-property",
  slug: "knowing",
  propertySlug: "knowing",
  definition: "what an element holds as so",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
