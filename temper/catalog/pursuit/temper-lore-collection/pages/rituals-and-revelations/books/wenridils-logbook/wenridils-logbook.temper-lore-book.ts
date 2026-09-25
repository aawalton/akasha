import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wenridilsLogbook = {
  id: "01a0d5f5-444d-79cd-9f62-5c48cc52360d",
  type: "page-type/temper-lore-book",
  slug: "wenridils-logbook",
  title: "Wenridil's Logbook",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 4562,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
