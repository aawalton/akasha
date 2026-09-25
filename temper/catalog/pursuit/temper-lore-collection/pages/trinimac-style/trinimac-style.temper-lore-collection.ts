import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const trinimacStyle = {
  id: "01a0d5e7-9d67-7495-a7ac-64a65b9387dc",
  type: "page-type/temper-lore-collection",
  slug: "trinimac-style",
  title: "Trinimac Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 11,
  esoLoreCollectionId: 89,
  loreCollectionDescription: "These book fragments enable crafting in the Trinimac style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
