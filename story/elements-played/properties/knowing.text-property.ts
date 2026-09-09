import type { TextProperty } from "@akasha/pages/text-property"

export type Knowing = string

export const knowing = {
  id: "01a06828-cb93-7f9c-89f9-65e57b1e1b0f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "knowing",
  propertySlug: "knowing",
  definition: "what an element has as so",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
