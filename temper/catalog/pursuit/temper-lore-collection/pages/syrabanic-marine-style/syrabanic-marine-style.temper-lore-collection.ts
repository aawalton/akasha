import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const syrabanicMarineStyle = {
  id: "01a0d5ee-d1f6-7d83-a549-0eebf48cbf01",
  type: "page-type/temper-lore-collection",
  slug: "syrabanic-marine-style",
  title: "Syrabanic Marine Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 96,
  esoLoreCollectionId: 197,
  loreCollectionDescription: "These book fragments enable crafting in the Syrabanic Marine style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
