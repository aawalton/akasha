import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromVila = {
  id: "01a0d5f5-abba-7e63-a2bf-7fa400f16949",
  type: "page-type/temper-lore-book",
  slug: "letter-from-vila",
  title: "Letter from Vila",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 322,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
