import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const imperialUniversityNote = {
  id: "01a0d5f7-73fa-7a1f-a5c9-62cb7747e01b",
  type: "page-type/temper-lore-book",
  slug: "imperial-university-note",
  title: "Imperial University Note",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3720,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
