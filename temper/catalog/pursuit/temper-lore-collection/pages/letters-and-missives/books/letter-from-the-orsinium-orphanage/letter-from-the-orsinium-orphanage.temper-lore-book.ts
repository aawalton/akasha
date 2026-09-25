import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromTheOrsiniumOrphanage = {
  id: "01a0d5f3-0ef7-705b-96bc-92cb35a3204a",
  type: "page-type/temper-lore-book",
  slug: "letter-from-the-orsinium-orphanage",
  title: "Letter from the Orsinium Orphanage",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2145,
  bookIndex: 87,
  charted: true,
  quest: 5014,
  positions: "jsonl",
} as const satisfies TemperLoreBook
