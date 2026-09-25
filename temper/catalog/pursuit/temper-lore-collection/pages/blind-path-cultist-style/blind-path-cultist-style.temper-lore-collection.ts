import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const blindPathCultistStyle = {
  id: "01a0d5f0-55f7-7723-a7b2-69ce4a174e1f",
  type: "page-type/temper-lore-collection",
  slug: "blind-path-cultist-style",
  title: "Blind Path Cultist Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 109,
  esoLoreCollectionId: 217,
  loreCollectionDescription:
    "These book fragments enable crafting in the Blind Path Cultist style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
