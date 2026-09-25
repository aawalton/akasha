import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mountsOfTamrielVolume1Horses = {
  id: "01a0d5f5-f3e4-74cf-97a3-5d15ea3e5de2",
  type: "page-type/temper-lore-book",
  slug: "mounts-of-tamriel-volume-1-horses",
  title: "Mounts of Tamriel: Volume 1, Horses",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 8765,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
