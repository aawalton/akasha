import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ancientOrcStyle = {
  id: "01a0d5e7-7380-70be-85b2-7ad16ff4fffe",
  type: "page-type/temper-lore-collection",
  slug: "ancient-orc-style",
  title: "Ancient Orc Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 9,
  esoLoreCollectionId: 84,
  loreCollectionDescription: "These book fragments enable crafting in the Ancient Orc style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
