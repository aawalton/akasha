import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const quartermastersNote = {
  id: "01a0d5f4-c389-7f6f-a658-9d717989c369",
  type: "page-type/temper-lore-book",
  slug: "quartermasters-note",
  title: "Quartermaster's Note",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2788,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
