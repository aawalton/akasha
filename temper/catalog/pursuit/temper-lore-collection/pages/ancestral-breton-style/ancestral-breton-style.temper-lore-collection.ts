import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ancestralBretonStyle = {
  id: "01a0d5ed-5de7-7d60-8d02-446f854d8631",
  type: "page-type/temper-lore-collection",
  slug: "ancestral-breton-style",
  title: "Ancestral Breton Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 78,
  esoLoreCollectionId: 174,
  loreCollectionDescription: "These book fragments enable crafting in the Ancestral Breton style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
