import type { TextProperty } from "@akasha/pages/text-property"

export type Hex = string

export const hex = {
  id: "01a06575-c2a9-7b99-9d14-8ae0dccda975",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "hex",
  propertySlug: "hex",
  definition: "the color written as hex, for wherever there is no palette to pick from",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
