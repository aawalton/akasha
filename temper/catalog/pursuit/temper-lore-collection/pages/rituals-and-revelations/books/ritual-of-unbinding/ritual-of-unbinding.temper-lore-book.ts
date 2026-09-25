import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritualOfUnbinding = {
  id: "01a0d5f5-444c-772e-8592-f9b14eaf173b",
  type: "page-type/temper-lore-book",
  slug: "ritual-of-unbinding",
  title: "Ritual of Unbinding",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 416,
  bookIndex: 9,
  charted: true,
  quest: 4124,
  positions: "jsonl",
} as const satisfies TemperLoreBook
