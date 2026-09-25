import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const rivenspireLore = {
  id: "01a06343-f9fa-7015-8921-d5868b2f83fb",
  type: "page-type/temper-lore-collection",
  slug: "rivenspire-lore",
  title: "Rivenspire Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 3,
  esoLoreCollectionId: 6,
  loreCollectionDescription: "A Mages Guild collection of lore books about Rivenspire.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
