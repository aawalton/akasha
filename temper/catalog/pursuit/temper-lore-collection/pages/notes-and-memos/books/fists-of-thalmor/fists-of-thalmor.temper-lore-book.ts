import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fistsOfThalmor = {
  id: "01a0d5f4-3c11-79bb-a55d-a0cad729cfba",
  type: "page-type/temper-lore-book",
  slug: "fists-of-thalmor",
  title: "Fists of Thalmor",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 600,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
