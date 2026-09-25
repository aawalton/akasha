import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const aldmeriDominionStyle = {
  id: "01a0d5e7-d966-75ab-8397-c066d7a6b260",
  type: "page-type/temper-lore-collection",
  slug: "aldmeri-dominion-style",
  title: "Aldmeri Dominion Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 14,
  esoLoreCollectionId: 92,
  loreCollectionDescription: "These book fragments enable crafting in the Aldmeri Dominion style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
