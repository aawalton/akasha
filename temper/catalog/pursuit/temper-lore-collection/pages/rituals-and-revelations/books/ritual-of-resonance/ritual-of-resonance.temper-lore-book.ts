import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritualOfResonance = {
  id: "01a0d5f5-444c-7163-9b78-c856c46684ca",
  type: "page-type/temper-lore-book",
  slug: "ritual-of-resonance",
  title: "Ritual of Resonance",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1449,
  bookIndex: 54,
  charted: true,
  quest: 4667,
  positions: "jsonl",
} as const satisfies TemperLoreBook
