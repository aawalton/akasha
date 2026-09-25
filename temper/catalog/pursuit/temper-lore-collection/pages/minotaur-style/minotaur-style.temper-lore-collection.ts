import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const minotaurStyle = {
  id: "01a0d5e8-9dae-78ca-b2f4-22fff64a2f8f",
  type: "page-type/temper-lore-collection",
  slug: "minotaur-style",
  title: "Minotaur Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 24,
  esoLoreCollectionId: 106,
  loreCollectionDescription: "These book fragments enable crafting in the Minotaur style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
