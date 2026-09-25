import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const coldharbourLore = {
  id: "01a06343-f9fa-713a-bbf4-380237d13ef6",
  type: "page-type/temper-lore-collection",
  slug: "coldharbour-lore",
  title: "Coldharbour Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 29,
  esoLoreCollectionId: 40,
  loreCollectionDescription: "A Mages Guild collection of books regarding Coldharbour.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_daedric.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
