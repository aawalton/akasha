import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const crimsonOathStyle = {
  id: "01a0d5ee-4f04-7699-ac57-4fe5be49767b",
  type: "page-type/temper-lore-collection",
  slug: "crimson-oath-style",
  title: "Crimson Oath Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 90,
  esoLoreCollectionId: 189,
  loreCollectionDescription: "These book fragments enable crafting in the Crimson Oath style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
