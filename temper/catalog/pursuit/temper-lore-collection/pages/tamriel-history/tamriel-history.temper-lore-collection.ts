import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const tamrielHistory = {
  id: "01a06343-f9fa-70cc-8f2e-1824bfa2e28c",
  type: "page-type/temper-lore-collection",
  slug: "tamriel-history",
  title: "Tamriel History",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 19,
  esoLoreCollectionId: 23,
  loreCollectionDescription:
    "A collection of Mages Guild collection of books pertaining to Tamriel's history.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
