import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const grayHostCommunique = {
  id: "01a0d60b-8107-7105-bf85-dfb4b55274be",
  type: "page-type/temper-lore-book",
  slug: "gray-host-communique",
  title: "Gray Host Communique",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5934,
  bookIndex: 26,
  charted: true,
  quest: 6466,
  positions: "jsonl",
} as const satisfies TemperLoreBook
