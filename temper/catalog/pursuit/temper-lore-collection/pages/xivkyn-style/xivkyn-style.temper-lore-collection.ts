import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const xivkynStyle = {
  id: "01a0d5e7-5f9d-7ddd-8aba-f89f29021e3b",
  type: "page-type/temper-lore-collection",
  slug: "xivkyn-style",
  title: "Xivkyn Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 8,
  esoLoreCollectionId: 81,
  loreCollectionDescription: "These book fragments enable crafting in the Xivkyn style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
