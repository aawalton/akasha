import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const dwemer = {
  id: "01a06343-f9fa-7079-b291-22dd8d434b26",
  type: "page-type/temper-lore-collection",
  slug: "dwemer",
  title: "Dwemer",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 12,
  esoLoreCollectionId: 16,
  loreCollectionDescription: "A Mages Guild collection of books regarding the Dwemer.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_dwemer.dds",
  hidden: false,
  bookTotal: 16,
  books: "jsonl",
} as const satisfies TemperLoreCollection
