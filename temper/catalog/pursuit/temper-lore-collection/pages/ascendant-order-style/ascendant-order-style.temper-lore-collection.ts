import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ascendantOrderStyle = {
  id: "01a0d5ee-bd49-7b60-8a62-ba2fd5500a0a",
  type: "page-type/temper-lore-collection",
  slug: "ascendant-order-style",
  title: "Ascendant Order Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 95,
  esoLoreCollectionId: 196,
  loreCollectionDescription: "These book fragments enable crafting in the Ascendant Order style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
