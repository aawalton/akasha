import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const auridonLore = {
  id: "01a06343-f9fa-710e-b937-b3df2f796107",
  type: "page-type/temper-lore-collection",
  slug: "auridon-lore",
  title: "Auridon Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 25,
  esoLoreCollectionId: 30,
  loreCollectionDescription: "A collection of Mages Guild books found in Auridon.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
