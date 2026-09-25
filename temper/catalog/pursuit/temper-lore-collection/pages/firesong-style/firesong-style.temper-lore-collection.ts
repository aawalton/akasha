import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const firesongStyle = {
  id: "01a0d5ef-b4ca-7ba8-a90e-7429aafc61a0",
  type: "page-type/temper-lore-collection",
  slug: "firesong-style",
  title: "Firesong Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 101,
  esoLoreCollectionId: 204,
  loreCollectionDescription: "These book fragments enable crafting in the Firesong style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
