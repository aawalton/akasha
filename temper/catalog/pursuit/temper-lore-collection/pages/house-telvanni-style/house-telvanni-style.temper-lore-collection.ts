import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const houseTelvanniStyle = {
  id: "01a0d5e9-4f13-7556-95f1-3d35ef3a9d0b",
  type: "page-type/temper-lore-collection",
  slug: "house-telvanni-style",
  title: "House Telvanni Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 33,
  esoLoreCollectionId: 116,
  loreCollectionDescription: "These books enable crafting in the House Telvanni style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
