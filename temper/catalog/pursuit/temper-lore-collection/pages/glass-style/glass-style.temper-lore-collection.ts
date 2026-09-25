import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const glassStyle = {
  id: "01a0d5e7-3952-7933-942c-d0da9eebf361",
  type: "page-type/temper-lore-collection",
  slug: "glass-style",
  title: "Glass Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 6,
  esoLoreCollectionId: 79,
  loreCollectionDescription: "These book fragments enable crafting in the Glass style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
