import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wormCultistMusings = {
  id: "01a0d60d-ff6a-73cf-b99d-042d3bb19108",
  type: "page-type/temper-lore-book",
  slug: "worm-cultist-musings",
  title: "Worm Cultist Musings",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8472,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
