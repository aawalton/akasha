import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const silkenRingStyle = {
  id: "01a0d5e9-2743-7c39-8981-0334a309128d",
  type: "page-type/temper-lore-collection",
  slug: "silken-ring-style",
  title: "Silken Ring Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 31,
  esoLoreCollectionId: 113,
  loreCollectionDescription: "These book fragments enable crafting in the Silken Ring style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
