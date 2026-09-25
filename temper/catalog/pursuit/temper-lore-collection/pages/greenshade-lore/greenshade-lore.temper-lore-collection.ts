import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const greenshadeLore = {
  id: "01a06343-f9fa-7124-b4f7-61e74a95c5de",
  type: "page-type/temper-lore-collection",
  slug: "greenshade-lore",
  title: "Greenshade Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 27,
  esoLoreCollectionId: 38,
  loreCollectionDescription: "A Mages Guild collection of books regarding Greenshade.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
