import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAlthen = {
  id: "01a0d5f3-0ef7-7567-90d5-ac0a299a19ef",
  type: "page-type/temper-lore-book",
  slug: "letter-from-althen",
  title: "Letter from Althen",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2126,
  bookIndex: 85,
  charted: true,
  quest: 5014,
  positions: "jsonl",
} as const satisfies TemperLoreBook
