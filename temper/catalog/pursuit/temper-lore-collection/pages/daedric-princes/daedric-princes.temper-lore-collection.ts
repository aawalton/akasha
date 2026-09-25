import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const daedricPrinces = {
  id: "01a06343-f9fa-7046-a185-288065db1524",
  type: "page-type/temper-lore-collection",
  slug: "daedric-princes",
  title: "Daedric Princes",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 8,
  esoLoreCollectionId: 12,
  loreCollectionDescription: "A Mages Guild collection of books regarding the Daedric Princes.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_daedric.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
