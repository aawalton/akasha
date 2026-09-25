import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onInferniums = {
  id: "01a0d60c-40c0-7338-a588-5c50c58e446e",
  type: "page-type/temper-lore-book",
  slug: "on-inferniums",
  title: "On Inferniums",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6921,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
