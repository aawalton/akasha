import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDaedricFlame = {
  id: "01a0d5f5-444c-7e52-af67-fd32e7140bed",
  type: "page-type/temper-lore-book",
  slug: "the-daedric-flame",
  title: "The Daedric Flame",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1747,
  bookIndex: 64,
  charted: true,
  quest: 4758,
  positions: "jsonl",
} as const satisfies TemperLoreBook
