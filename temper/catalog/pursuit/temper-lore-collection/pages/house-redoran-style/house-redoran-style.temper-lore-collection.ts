import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const houseRedoranStyle = {
  id: "01a0d5e9-afc3-7b6a-9a9f-273b5ebab78e",
  type: "page-type/temper-lore-collection",
  slug: "house-redoran-style",
  title: "House Redoran Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 38,
  esoLoreCollectionId: 122,
  loreCollectionDescription: "These books enable crafting in the House Redoran style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
