import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Family = string
export type Families = List<Family>

export const families = {
  id: "01a05480-1c89-7261-a8c7-0538e7ae019b",
  pageTypeSlug: "text-property",
  slug: "families",
  propertySlug: "families",
  definition: "the tile sizes a widget can be placed at",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
