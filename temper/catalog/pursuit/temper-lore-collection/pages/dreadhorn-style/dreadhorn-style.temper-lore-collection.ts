import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const dreadhornStyle = {
  id: "01a0d5e9-ea2a-7bc2-9d8e-f61a3b6d3c48",
  type: "page-type/temper-lore-collection",
  slug: "dreadhorn-style",
  title: "Dreadhorn Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 41,
  esoLoreCollectionId: 126,
  loreCollectionDescription: "These book fragments enable crafting in the Dreadhorn style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
