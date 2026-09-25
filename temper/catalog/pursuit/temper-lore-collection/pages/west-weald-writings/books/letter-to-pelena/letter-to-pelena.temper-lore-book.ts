import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToPelena = {
  id: "01a0d60d-4aaf-7c27-8d1a-d89626d400f9",
  type: "page-type/temper-lore-book",
  slug: "letter-to-pelena",
  title: "Letter to Pelena",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7839,
  bookIndex: 69,
  charted: true,
  quest: 7082,
  positions: "jsonl",
} as const satisfies TemperLoreBook
