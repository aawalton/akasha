import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const akaviriStyle = {
  id: "01a0d5e7-1170-73d2-af4b-ef45cea13855",
  type: "page-type/temper-lore-collection",
  slug: "akaviri-style",
  title: "Akaviri Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 4,
  esoLoreCollectionId: 77,
  loreCollectionDescription: "These books enable crafting in the Akaviri style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
