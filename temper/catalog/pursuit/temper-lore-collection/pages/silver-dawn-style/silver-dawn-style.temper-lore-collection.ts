import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const silverDawnStyle = {
  id: "01a0d5eb-5d7e-756b-9d66-9c25e4e5fe59",
  type: "page-type/temper-lore-collection",
  slug: "silver-dawn-style",
  title: "Silver Dawn Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 52,
  esoLoreCollectionId: 140,
  loreCollectionDescription: "These book fragments enable crafting in the Silver Dawn style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
