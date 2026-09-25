import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const deadKeeperStyle = {
  id: "01a0d5f0-18e2-79de-ac54-5144ac2fe932",
  type: "page-type/temper-lore-collection",
  slug: "dead-keeper-style",
  title: "Dead Keeper Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 106,
  esoLoreCollectionId: 213,
  loreCollectionDescription: "These book fragments enable crafting in the Dead Keeper style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
