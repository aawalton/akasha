import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const booksOfBlackwood = {
  id: "01a0d60b-fdae-7b59-80ca-75b537f22755",
  type: "page-type/temper-lore-collection",
  slug: "books-of-blackwood",
  title: "Books of Blackwood",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 42,
  esoLoreCollectionId: 175,
  loreCollectionDescription:
    "Notes, letters, journals, and tomes related to the region known as Blackwood and nearby locations around Topal Bay.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 118,
} as const satisfies TemperLoreCollection
