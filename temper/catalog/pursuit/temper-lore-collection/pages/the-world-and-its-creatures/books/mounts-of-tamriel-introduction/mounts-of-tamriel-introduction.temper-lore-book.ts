import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mountsOfTamrielIntroduction = {
  id: "01a0d5f5-f3e4-79f6-90a7-04ddd0562f53",
  type: "page-type/temper-lore-book",
  slug: "mounts-of-tamriel-introduction",
  title: "Mounts of Tamriel: Introduction",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 8764,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
