import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const challengesOfTheIndrik = {
  id: "01a0d60d-9a63-7521-a77c-0c1266433a03",
  type: "page-type/temper-lore-book",
  slug: "challenges-of-the-indrik",
  title: "Challenges of the Indrik",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8028,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
