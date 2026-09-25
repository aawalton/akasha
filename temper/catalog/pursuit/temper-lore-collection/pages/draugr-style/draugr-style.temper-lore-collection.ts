import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const draugrStyle = {
  id: "01a0d5e8-89fc-7176-a02b-29946a09e6df",
  type: "page-type/temper-lore-collection",
  slug: "draugr-style",
  title: "Draugr Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 23,
  esoLoreCollectionId: 105,
  loreCollectionDescription: "These book fragments enable crafting in the Draugr style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
