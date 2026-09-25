import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const moragTongStyle = {
  id: "01a0d5e7-c5c5-71fb-b6d9-e1fde33d2237",
  type: "page-type/temper-lore-collection",
  slug: "morag-tong-style",
  title: "Morag Tong Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 13,
  esoLoreCollectionId: 91,
  loreCollectionDescription: "These books enable crafting in the Morag Tong style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
