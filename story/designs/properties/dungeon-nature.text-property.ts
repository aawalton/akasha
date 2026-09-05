import type { TextProperty } from "@akasha/pages-system/text-property"

export type DungeonNature = string

export const dungeonNature = {
  id: "01a06577-f385-73de-818d-b47eb6de8e2c",
  pageTypeSlug: "text-property",
  slug: "dungeon-nature",
  propertySlug: "dungeon-nature",
  definition: "what the dungeon a story is set in is",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
