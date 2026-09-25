import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const stonefallsLore = {
  id: "01a06343-f9fa-70d7-8a8a-ee74811ed38c",
  type: "page-type/temper-lore-collection",
  slug: "stonefalls-lore",
  title: "Stonefalls Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 20,
  esoLoreCollectionId: 24,
  loreCollectionDescription: "A Mages Guild collection of books regarding Stonefalls.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
