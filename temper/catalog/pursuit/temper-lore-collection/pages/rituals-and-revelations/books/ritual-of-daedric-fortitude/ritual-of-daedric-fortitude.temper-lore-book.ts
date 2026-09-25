import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritualOfDaedricFortitude = {
  id: "01a0d5f5-444c-7b59-8f11-a99d89b65323",
  type: "page-type/temper-lore-book",
  slug: "ritual-of-daedric-fortitude",
  title: "Ritual of Daedric Fortitude",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 2479,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
