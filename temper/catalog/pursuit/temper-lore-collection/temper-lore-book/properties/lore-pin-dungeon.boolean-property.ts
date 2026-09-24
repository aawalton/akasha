import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const lorePinDungeon = {
  id: "01a0d5da-b5a1-7f63-8f26-2d1ac7456ce7",
  type: "page-type/boolean-property",
  slug: "lore-pin-dungeon",
  propertySlug: "dungeon",
  definition: "whether the LoreBooks add-on tags a place as inside a dungeon",
  types: "ts",
} as const satisfies BooleanProperty
