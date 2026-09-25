import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const moongraveFaneStyle = {
  id: "01a0d5ec-4b37-77e9-979a-a1f9a258c440",
  type: "page-type/temper-lore-collection",
  slug: "moongrave-fane-style",
  title: "Moongrave Fane Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 64,
  esoLoreCollectionId: 155,
  loreCollectionDescription: "These book fragments enable crafting in the Moongrave Fane style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
