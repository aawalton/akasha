import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const houseHlaaluStyle = {
  id: "01a0d5e9-9c74-7e8a-a4e4-0f29d327d1f3",
  type: "page-type/temper-lore-collection",
  slug: "house-hlaalu-style",
  title: "House Hlaalu Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 37,
  esoLoreCollectionId: 121,
  loreCollectionDescription: "These books enable crafting in the House Hlaalu style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
