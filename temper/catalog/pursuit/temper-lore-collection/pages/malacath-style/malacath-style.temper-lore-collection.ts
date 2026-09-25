import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const malacathStyle = {
  id: "01a0d5e7-b1b8-7613-b9e5-5e3457b5a437",
  type: "page-type/temper-lore-collection",
  slug: "malacath-style",
  title: "Malacath Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 12,
  esoLoreCollectionId: 90,
  loreCollectionDescription: "These book fragments enable crafting in the Malacath style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
