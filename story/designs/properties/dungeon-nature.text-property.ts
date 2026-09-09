import type { TextProperty } from "@akasha/pages/text-property"

export type DungeonNature = string

export const dungeonNature = {
  id: "01a06577-f385-73de-818d-b47eb6de8e2c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "dungeon-nature",
  propertySlug: "dungeon-nature",
  definition: "what the dungeon a story is set in is",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty
