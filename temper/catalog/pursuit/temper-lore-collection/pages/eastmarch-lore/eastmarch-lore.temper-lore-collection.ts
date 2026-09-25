import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const eastmarchLore = {
  id: "01a06343-f9fa-70ed-a5d8-d486330c3cf9",
  type: "page-type/temper-lore-collection",
  slug: "eastmarch-lore",
  title: "Eastmarch Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 22,
  esoLoreCollectionId: 27,
  loreCollectionDescription: "A Mages Guild collection of books regarding Eastmarch.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
