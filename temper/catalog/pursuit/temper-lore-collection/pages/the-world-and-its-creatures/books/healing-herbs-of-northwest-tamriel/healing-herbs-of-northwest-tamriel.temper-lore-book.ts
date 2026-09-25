import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const healingHerbsOfNorthwestTamriel = {
  id: "01a0d5f5-f3e3-746a-b416-66ecdb7e312e",
  type: "page-type/temper-lore-book",
  slug: "healing-herbs-of-northwest-tamriel",
  title: "Healing Herbs of Northwest Tamriel",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1859,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
