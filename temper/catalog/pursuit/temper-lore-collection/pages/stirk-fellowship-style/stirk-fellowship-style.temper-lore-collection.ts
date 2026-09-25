import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const stirkFellowshipStyle = {
  id: "01a0d5f0-e818-77e4-9604-ebb272dc598c",
  type: "page-type/temper-lore-collection",
  slug: "stirk-fellowship-style",
  title: "Stirk Fellowship Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 116,
  esoLoreCollectionId: 227,
  loreCollectionDescription: "These book fragments enable crafting in the Stirk Fellowship style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
