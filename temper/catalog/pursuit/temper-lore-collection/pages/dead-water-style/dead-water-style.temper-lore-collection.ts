import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const deadWaterStyle = {
  id: "01a0d5eb-99af-7060-9233-8c95d6bc3590",
  type: "page-type/temper-lore-collection",
  slug: "dead-water-style",
  title: "Dead-Water Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 55,
  esoLoreCollectionId: 144,
  loreCollectionDescription: "These book fragments enable crafting in the Dead-Water style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
