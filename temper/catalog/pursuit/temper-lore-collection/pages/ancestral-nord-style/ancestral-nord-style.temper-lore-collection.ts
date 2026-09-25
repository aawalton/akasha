import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ancestralNordStyle = {
  id: "01a0d5ec-e8ed-78ab-801b-8bce3fe58acf",
  type: "page-type/temper-lore-collection",
  slug: "ancestral-nord-style",
  title: "Ancestral Nord Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 72,
  esoLoreCollectionId: 166,
  loreCollectionDescription: "These book fragments enable crafting in the Ancestral Nord style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
