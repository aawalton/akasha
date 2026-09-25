import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const celestialStyle = {
  id: "01a0d5e8-c5f9-7494-b4fb-77e458989dc2",
  type: "page-type/temper-lore-collection",
  slug: "celestial-style",
  title: "Celestial Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 26,
  esoLoreCollectionId: 108,
  loreCollectionDescription: "These book fragments enable crafting in the Celestial style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
