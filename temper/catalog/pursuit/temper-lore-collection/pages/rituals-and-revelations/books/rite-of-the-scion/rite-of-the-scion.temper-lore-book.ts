import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const riteOfTheScion = {
  id: "01a0d5f5-444c-7cf8-81f7-df4dd395e4e5",
  type: "page-type/temper-lore-book",
  slug: "rite-of-the-scion",
  title: "Rite of the Scion",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 2061,
  bookIndex: 80,
  charted: true,
  quest: 4964,
  positions: "jsonl",
} as const satisfies TemperLoreBook
