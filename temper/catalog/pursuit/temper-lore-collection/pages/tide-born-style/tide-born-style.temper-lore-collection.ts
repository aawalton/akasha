import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const tideBornStyle = {
  id: "01a0d5f1-11ae-71f7-8be0-8ca963203648",
  type: "page-type/temper-lore-collection",
  slug: "tide-born-style",
  title: "Tide-Born Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 118,
  esoLoreCollectionId: 229,
  loreCollectionDescription: "These book fragments enable crafting in the Tide-Born style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
