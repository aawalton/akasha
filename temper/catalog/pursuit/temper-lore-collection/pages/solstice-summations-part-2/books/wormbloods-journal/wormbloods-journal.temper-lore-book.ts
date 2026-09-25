import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wormbloodsJournal = {
  id: "01a0d60e-45b3-7adf-aa12-ce3d9a97e68e",
  type: "page-type/temper-lore-book",
  slug: "wormbloods-journal",
  title: "Wormblood's Journal",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8569,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
