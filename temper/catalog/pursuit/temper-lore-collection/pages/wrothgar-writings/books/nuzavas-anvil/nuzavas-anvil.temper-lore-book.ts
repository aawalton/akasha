import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nuzavasAnvil = {
  id: "01a0d5f6-d68b-7023-8bfe-20fecce92d8b",
  type: "page-type/temper-lore-book",
  slug: "nuzavas-anvil",
  title: "Nuzava's Anvil",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3115,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
