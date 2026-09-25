import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secretsOfTheRiddlethar = {
  id: "01a0d60b-4e03-74f0-8881-7b63f3d5f227",
  type: "page-type/temper-lore-book",
  slug: "secrets-of-the-riddlethar",
  title: "Secrets of the Riddle'Thar",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5874,
  bookIndex: 72,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 37, mapCount: 12 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
