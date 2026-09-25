import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const annihilarchsChosenStyle = {
  id: "01a0d5ee-7c0a-71f3-9fea-61b2e9043c1f",
  type: "page-type/temper-lore-collection",
  slug: "annihilarchs-chosen-style",
  title: "Annihilarch's Chosen Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 92,
  esoLoreCollectionId: 191,
  loreCollectionDescription:
    "These book fragments enable crafting in the Annihilarch's Chosen style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
