import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ancestralOrcStyle = {
  id: "01a0d5ed-1034-73db-b293-01be8312ebaa",
  type: "page-type/temper-lore-collection",
  slug: "ancestral-orc-style",
  title: "Ancestral Orc Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 74,
  esoLoreCollectionId: 168,
  loreCollectionDescription: "These book fragments enable crafting in the Ancestral Orc style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
