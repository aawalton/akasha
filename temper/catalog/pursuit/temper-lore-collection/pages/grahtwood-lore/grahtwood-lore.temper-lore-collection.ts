import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const grahtwoodLore = {
  id: "01a06343-f9fa-7119-bb9f-9cbfdfbc74bd",
  type: "page-type/temper-lore-collection",
  slug: "grahtwood-lore",
  title: "Grahtwood Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 26,
  esoLoreCollectionId: 32,
  loreCollectionDescription: "A Mages Guild collection of books regarding Grahtwood.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
