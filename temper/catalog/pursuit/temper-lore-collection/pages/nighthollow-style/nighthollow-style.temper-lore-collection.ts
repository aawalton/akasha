import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const nighthollowStyle = {
  id: "01a0d5ed-8478-70fe-92af-2d13a7eb464a",
  type: "page-type/temper-lore-collection",
  slug: "nighthollow-style",
  title: "Nighthollow Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 80,
  esoLoreCollectionId: 177,
  loreCollectionDescription: "These book fragments enable crafting in the Nighthollow style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
