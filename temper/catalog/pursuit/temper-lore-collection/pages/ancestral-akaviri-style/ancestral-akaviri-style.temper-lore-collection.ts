import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ancestralAkaviriStyle = {
  id: "01a0d5ed-4a80-70e9-bbcd-f11a3b141a21",
  type: "page-type/temper-lore-collection",
  slug: "ancestral-akaviri-style",
  title: "Ancestral Akaviri Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 77,
  esoLoreCollectionId: 173,
  loreCollectionDescription: "These book fragments enable crafting in the Ancestral Akaviri style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
