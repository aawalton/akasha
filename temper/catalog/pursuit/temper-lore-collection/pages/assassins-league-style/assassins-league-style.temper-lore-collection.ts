import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const assassinsLeagueStyle = {
  id: "01a0d5e8-4f20-7ea7-9536-cb665313c3b9",
  type: "page-type/temper-lore-collection",
  slug: "assassins-league-style",
  title: "Assassins League Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 20,
  esoLoreCollectionId: 99,
  loreCollectionDescription: "These book fragments enable crafting in the Assassins League style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
