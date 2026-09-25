import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const farewellNoteToLauriel = {
  id: "01a0d60a-d5bc-725c-b592-ffe454a99726",
  type: "page-type/temper-lore-book",
  slug: "farewell-note-to-lauriel",
  title: "Farewell Note to Lauriel",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4906,
  bookIndex: 88,
  charted: true,
  quest: 6118,
  positions: "jsonl",
} as const satisfies TemperLoreBook
