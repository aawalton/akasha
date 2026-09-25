import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const keeperOfTomes = {
  id: "01a0d5f5-444b-7040-aa4d-13bd22d4bbf3",
  type: "page-type/temper-lore-book",
  slug: "keeper-of-tomes",
  title: "Keeper of Tomes",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 963,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
