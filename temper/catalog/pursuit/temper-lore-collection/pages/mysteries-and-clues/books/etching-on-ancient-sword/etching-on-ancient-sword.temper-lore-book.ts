import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const etchingOnAncientSword = {
  id: "01a0d5f4-07b7-7fb0-948d-76e0765075da",
  type: "page-type/temper-lore-book",
  slug: "etching-on-ancient-sword",
  title: "Etching on Ancient Sword",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1005,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
