import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const skinchangerStyle = {
  id: "01a0d5e9-13d4-73ee-8e9a-65400de689ef",
  type: "page-type/temper-lore-collection",
  slug: "skinchanger-style",
  title: "Skinchanger Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 30,
  esoLoreCollectionId: 112,
  loreCollectionDescription: "These book fragments enable crafting in the Skinchanger style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
