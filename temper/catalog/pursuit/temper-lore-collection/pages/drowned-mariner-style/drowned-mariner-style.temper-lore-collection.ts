import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const drownedMarinerStyle = {
  id: "01a0d5ef-a071-7d01-a75e-e79194a64fd0",
  type: "page-type/temper-lore-collection",
  slug: "drowned-mariner-style",
  title: "Drowned Mariner Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 100,
  esoLoreCollectionId: 202,
  loreCollectionDescription: "These book fragments enable crafting in the Drowned Mariner style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
