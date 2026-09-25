import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const apostleStyle = {
  id: "01a0d5e9-fdae-7442-bb59-e52a5980929f",
  type: "page-type/temper-lore-collection",
  slug: "apostle-style",
  title: "Apostle Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 42,
  esoLoreCollectionId: 127,
  loreCollectionDescription: "These book fragments enable crafting in the Apostle style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
