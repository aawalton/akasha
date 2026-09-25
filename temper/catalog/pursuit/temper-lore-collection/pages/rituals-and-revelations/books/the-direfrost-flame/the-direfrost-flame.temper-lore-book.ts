import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDirefrostFlame = {
  id: "01a0d5f5-444c-7304-bbbe-258a026470a3",
  type: "page-type/temper-lore-book",
  slug: "the-direfrost-flame",
  title: "The Direfrost Flame",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 896,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
