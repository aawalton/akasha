import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const topalLegionaryAcademy = {
  id: "01a0d60b-4e03-70c3-b8b1-22f78ba46082",
  type: "page-type/temper-lore-book",
  slug: "topal-legionary-academy",
  title: "Topal Legionary Academy",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5819,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
