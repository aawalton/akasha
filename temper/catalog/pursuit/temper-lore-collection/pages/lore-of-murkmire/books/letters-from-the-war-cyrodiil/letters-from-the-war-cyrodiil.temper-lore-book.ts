import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lettersFromTheWarCyrodiil = {
  id: "01a0d5f6-a29a-7f4e-a5d9-fccc66ef4f6b",
  type: "page-type/temper-lore-book",
  slug: "letters-from-the-war-cyrodiil",
  title: "Letters from the War: Cyrodiil",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2849,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
