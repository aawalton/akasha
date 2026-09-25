import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const namirasDance = {
  id: "01a0d60b-c958-7ce5-8a43-e1c8997b4658",
  type: "page-type/temper-lore-book",
  slug: "namiras-dance",
  title: "Namira's Dance",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6447,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
