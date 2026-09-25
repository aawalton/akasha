import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const edricsConfession = {
  id: "01a0d60d-4aaf-77ad-be6c-06d5cef3bb70",
  type: "page-type/temper-lore-book",
  slug: "edrics-confession",
  title: "Edric's Confession",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7838,
  bookIndex: 68,
  charted: true,
  quest: 7082,
  positions: "jsonl",
} as const satisfies TemperLoreBook
