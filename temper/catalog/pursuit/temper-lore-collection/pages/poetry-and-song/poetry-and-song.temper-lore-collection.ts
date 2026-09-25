import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const poetryAndSong = {
  id: "01a06343-f9fa-70c1-b215-a36990c43090",
  type: "page-type/temper-lore-collection",
  slug: "poetry-and-song",
  title: "Poetry and Song",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 18,
  esoLoreCollectionId: 22,
  loreCollectionDescription: "A Mages Guild collection of books celebrating lyrics and verse.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
