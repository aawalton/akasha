import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const wakingFlameStyle = {
  id: "01a0d5ed-e631-7395-92f7-62d51a035d33",
  type: "page-type/temper-lore-collection",
  slug: "waking-flame-style",
  title: "Waking Flame Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 85,
  esoLoreCollectionId: 183,
  loreCollectionDescription: "These book fragments enable crafting in the Waking Flame style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
