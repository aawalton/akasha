import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const knahatenFluConfirmed = {
  id: "01a0d5f2-509f-7a49-a693-5b873203494a",
  type: "page-type/temper-lore-book",
  slug: "knahaten-flu-confirmed",
  title: "Knahaten Flu Confirmed",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 664,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
