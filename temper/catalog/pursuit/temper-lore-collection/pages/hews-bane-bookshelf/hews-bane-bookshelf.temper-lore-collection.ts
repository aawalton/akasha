import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const hewsBaneBookshelf = {
  id: "01a0d5f7-4294-71f3-90e2-3502eca00da0",
  type: "page-type/temper-lore-collection",
  slug: "hews-bane-bookshelf",
  title: "Hew's Bane Bookshelf",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 28,
  esoLoreCollectionId: 86,
  loreCollectionDescription: "A collection of books found in the Hammerfell region of Hew's Bane.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 78,
} as const satisfies TemperLoreCollection
