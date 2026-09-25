import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const outlawStyle = {
  id: "01a0d5e7-87f8-7147-8773-5192f10d5515",
  type: "page-type/temper-lore-collection",
  slug: "outlaw-style",
  title: "Outlaw Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 10,
  esoLoreCollectionId: 88,
  loreCollectionDescription: "These book fragments enable crafting in the Outlaw style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
