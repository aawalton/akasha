import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type Family = string
export type Families = List<Family>

export const families = {
  id: "01a05480-1c89-7261-a8c7-0538e7ae019b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "families",
  propertySlug: "families",
  definition: "the tile sizes a widget can be placed at",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
