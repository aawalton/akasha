import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const understandingTheLivingGods = {
  id: "01a0d5f7-aa9a-7766-b130-39c2b8674e58",
  type: "page-type/temper-lore-book",
  slug: "understanding-the-living-gods",
  title: "Understanding the Living Gods",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4004,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
