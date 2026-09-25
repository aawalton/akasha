import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hildunesSecretRefuge = {
  id: "01a0d5f4-c388-76fc-954e-9b09cf4e6e2f",
  type: "page-type/temper-lore-book",
  slug: "hildunes-secret-refuge",
  title: "Hildune's Secret Refuge",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 99,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
