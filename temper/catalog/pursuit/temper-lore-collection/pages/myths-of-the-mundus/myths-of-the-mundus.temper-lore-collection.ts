import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const mythsOfTheMundus = {
  id: "01a06343-f9fa-70ab-97a3-9da5448391df",
  type: "page-type/temper-lore-collection",
  slug: "myths-of-the-mundus",
  title: "Myths of the Mundus",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 16,
  esoLoreCollectionId: 20,
  loreCollectionDescription: "A Mages Guild collection of books regarding ancient myths.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
