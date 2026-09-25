import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mountsOfTamrielVolume4BigCats = {
  id: "01a0d5f5-f3e4-74a2-bcf3-8c1d24715e81",
  type: "page-type/temper-lore-book",
  slug: "mounts-of-tamriel-volume-4-big-cats",
  title: "Mounts of Tamriel: Volume 4, Big Cats",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 8768,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
