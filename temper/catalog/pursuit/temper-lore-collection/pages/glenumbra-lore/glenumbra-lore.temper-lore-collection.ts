import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const glenumbraLore = {
  id: "01a06343-f9f9-7000-9866-8c0c978d0cda",
  type: "page-type/temper-lore-collection",
  slug: "glenumbra-lore",
  title: "Glenumbra Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 1,
  esoLoreCollectionId: 3,
  loreCollectionDescription: "A Mages Guild collection of lore books about Glenumbra.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
