import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const loreBookQuest = {
  id: "01a0d5da-b5a1-77d6-b2c5-2e4b0fbcc53d",
  type: "page-type/number-property",
  slug: "lore-book-quest",
  propertySlug: "quest",
  definition: "the game's id of the quest the LoreBooks add-on names beside a book",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
