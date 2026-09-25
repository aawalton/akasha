import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anotherScrawledNote = {
  id: "01a0d5f6-45ad-7335-9ef0-32c47116e754",
  type: "page-type/temper-lore-book",
  slug: "another-scrawled-note",
  title: "Another Scrawled Note",
  collection: "temper-lore-collection/final-words",
  esoBookId: 142,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
