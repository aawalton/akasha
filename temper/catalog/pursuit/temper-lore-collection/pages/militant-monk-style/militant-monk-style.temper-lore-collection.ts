import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const militantMonkStyle = {
  id: "01a0d5f0-d356-729d-94a1-9a092d9cb18c",
  type: "page-type/temper-lore-collection",
  slug: "militant-monk-style",
  title: "Militant Monk Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 115,
  esoLoreCollectionId: 225,
  loreCollectionDescription: "These book fragments enable crafting in the Militant Monk style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
