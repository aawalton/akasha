import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Kind = string

export const kind = {
  id: "01a05480-1c88-782b-99a4-ae4cc4ac019e",
  pageTypeSlug: "text-property",
  slug: "kind",
  propertySlug: "kind",
  definition: "the name a placed tile is bound to on the device",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
