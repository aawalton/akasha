import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const daggerfallCovenantStyle = {
  id: "01a0d5e7-ed04-74cf-9298-67297eeecd00",
  type: "page-type/temper-lore-collection",
  slug: "daggerfall-covenant-style",
  title: "Daggerfall Covenant Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 15,
  esoLoreCollectionId: 93,
  loreCollectionDescription:
    "These book fragments enable crafting in the Daggerfall Covenant style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
