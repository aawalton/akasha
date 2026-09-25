import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromTuro = {
  id: "01a0d60b-4e02-700a-84b1-a58b9bb7bc71",
  type: "page-type/temper-lore-book",
  slug: "letter-from-turo",
  title: "Letter from Turo",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5723,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
